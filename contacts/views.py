import datetime

from django.db.models import Q
from django.utils import timezone
from django.views.generic import TemplateView
from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from rest_framework.views import APIView

from coaching_motivation_platform import settings
from contacts.models import Contact, Message, Tag, MessageTemplate
from contacts.serializers import ContactSerializer, ContactMessagesSerializer, \
    MessageDetailsSerializer, TagSerializer, MessageTemplateSerializer, MessageCreateSerializer


class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        context['is_production'] = settings.PRODUCTION
        return context


class ContactViewSet(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    queryset = Contact.objects.order_by('-lastContact')
    serializer_class = ContactSerializer
    filter_fields = ('isActive',)

    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save()


class ContactMessagesViewSet(mixins.ListModelMixin,
                             viewsets.GenericViewSet):
    serializer_class = ContactMessagesSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        """
        Get the messages send to given contact
        """
        contact_id = self.kwargs['contact_id']
        return Message.objects.filter(contact_id=contact_id)


class MessageViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    queryset = Message.objects.filter(state="QUEUED")

    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == u'create':
            return MessageCreateSerializer
        return MessageDetailsSerializer

    def perform_create(self, serializer):
        serializer.save()


class MessageCreateViewSet(mixins.CreateModelMixin,
                           viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageCreateSerializer
    permission_classes = (permissions.IsAuthenticated,)


class TagViewSet(mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    permission_classes = (permissions.IsAuthenticated,)


class MessageTemplatesViewSet(mixins.CreateModelMixin,
                              mixins.ListModelMixin,
                              mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin,
                              viewsets.GenericViewSet):
    queryset = MessageTemplate.objects.all()
    serializer_class = MessageTemplateSerializer

    permission_classes = (permissions.IsAuthenticated,)


class StatsView(APIView):
    """
    View returning basic stats about system
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        return Response({"stats": {
            "activeClients": Contact.objects.filter(isActive=True).count(),
            "contactNeeded": len(self.get_contact_needed()),
            "templates": MessageTemplate.objects.count(),
            "inMsgQueue": Message.objects.filter(state="QUEUED").count()
        }})

    @staticmethod
    def get_contact_needed():
        contacts = Contact.objects \
            .filter(Q(isActive=True) &
                    Q(Q(postponed__lt=timezone.now()) |
                      Q(postponed=None)) &
                    Q(Q(lastContact__lt=timezone.now() - datetime.timedelta(hours=24)) |
                      Q(lastContact=None))).all()
        contact_needed = [contact for contact in contacts
                          if (not contact.lastContact or
                              contact.lastContact + datetime.timedelta(hours=contact.notificationsFrequency)
                              < timezone.now()) and
                          not contact.plannedContact]
        return contact_needed