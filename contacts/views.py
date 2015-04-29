from django.views.generic import TemplateView
from rest_framework import viewsets, permissions, mixins

from coaching_motivation_platform import settings
from contacts.models import Contact, Message, Tag, MessageTemplate
from contacts.serializers import ContactSerializer, ContactMessagesSerializer, \
    MessageDetailsSerializer, TagSerializer, MessageTemplateSerializer


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
                     viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageDetailsSerializer

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)


class TagViewSet(mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)


class MessageTemplatesSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          viewsets.GenericViewSet):
    queryset = MessageTemplate.objects.all()
    serializer_class = MessageTemplateSerializer

    def get_permissions(self):
        # TODO: add permission for authenticated users
        return (permissions.AllowAny(),)