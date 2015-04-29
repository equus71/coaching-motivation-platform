from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.serializers import BaseSerializer
from contacts.fields import TagListField
from contacts.models import Contact, Message, MessageTemplate


class ContactMessagesSerializer(serializers.ModelSerializer):
    """
    Short serializer intended for preparing the short list of messages belonging to the contact
    """

    class Meta:
        model = Message

        fields = ('id', 'body', 'header', 'creationDate', 'sendAtDate')
        read_only_fields = ('id',)


class MessageDetailsSerializer(serializers.ModelSerializer):
    """
    Full messages serializer
    """

    class Meta:
        model = Message

        fields = ('id', 'contact', 'recipientName', 'recipientPhone', 'recipientEmail', 'type', 'body', 'header',
                  'creationDate', 'sendAtDate')
        read_only_fields = ('id', 'contact')


class ContactSerializer(serializers.ModelSerializer):
    tags = TagListField()

    class Meta:
        model = Contact

        fields = ('id', 'firstName', 'lastName', 'email', 'phone', 'postponed', 'lastContact', 'gender', 'age',
                  'notificationsFrequency', 'isActive', 'tags', 'state', 'firstNameDeclension')
        read_only_fields = ('id',)

        # def create(self, validated_data):
        # return Contact.objects.create(**validated_data)


class TagSerializer(serializers.BaseSerializer):
    """
    Dummy serializer making from the tag a plain string representing given tag
    """
    def to_internal_value(self, data):
        raise NotImplementedError('This serializer is read-only')

    def create(self, validated_data):
        raise NotImplementedError('This serializer is read-only')

    def update(self, instance, validated_data):
        raise NotImplementedError('This serializer is read-only')

    def to_representation(self, data):
        return data.name


class MessageTemplateSerializer(serializers.ModelSerializer):
    tags = TagListField()

    class Meta:
        model = MessageTemplate

        fields = ('id', 'name', 'type', 'templateHeader', 'templateBody', 'tags', 'uses')
        read_only_fields = ('id', 'contact')