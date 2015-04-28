from django.contrib.auth.models import User, Group
from rest_framework import serializers
from contacts.fields import TagListField
from contacts.models import Contact, Message


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
    # TODO: add state computing to the serializer

    class Meta:
        model = Contact

        fields = ('id', 'firstName', 'lastName', 'email', 'phone', 'postponed', 'lastContact', 'gender', 'age',
                  'notificationsFrequency', 'isActive', 'tags', 'state')
        read_only_fields = ('id',)

        # def create(self, validated_data):
        # return Contact.objects.create(**validated_data)



