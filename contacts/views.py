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

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)

    def perform_create(self, serializer):
        serializer.save()


class ContactMessagesViewSet(mixins.ListModelMixin,
                             viewsets.GenericViewSet):
    serializer_class = ContactMessagesSerializer

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)

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

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)

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
    # TODO: add permission for authenticated users
    permission_classes = (permissions.AllowAny,)


class TagViewSet(mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)


class MessageTemplatesViewSet(mixins.CreateModelMixin,
                              mixins.ListModelMixin,
                              mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin,
                              viewsets.GenericViewSet):
    queryset = MessageTemplate.objects.all()
    serializer_class = MessageTemplateSerializer

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)


class StatsView(APIView):
    """
    View returning basic stats about system
    """
    # TODO: add permission for authenticated users
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({"stats": {
            "activeClients": Contact.objects.filter(isActive=True).count(),
            # TODO: contact needed computation
            "contactNeeded": 5,
            "templates": MessageTemplate.objects.count(),
            "inMsgQueue": Message.objects.filter(state="QUEUED").count()
        }})