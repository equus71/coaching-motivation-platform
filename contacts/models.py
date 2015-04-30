import datetime
from django.db import models
from django.utils import timezone
from contacts.nameForm import get_name_declension


MESSAGE_TYPE = (('EMAIL', 'EMAIL'), ('SMS', 'SMS'))
MESSAGE_STATE = (('SEND', 'SEND'), ('QUEUED', 'QUEUED'))


class Tag(models.Model):
    name = models.CharField(max_length=40, unique=True)


class Contact(models.Model):
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)
    lastContact = models.DateTimeField('Last contact made with the contact', blank=True, null=True)
    postponed = models.DateTimeField('Contact with the contact postponed till', blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=16, blank=True, null=True)
    age = models.IntegerField()
    gender = models.IntegerField()
    notificationsFrequency = models.IntegerField()
    tags = models.ManyToManyField(Tag)
    isActive = models.BooleanField(default=True)
    notes = models.CharField(max_length=4096, blank=True, null=True)

    def __unicode__(self):
        return '{0} {1}'.format(self.firstName, self.lastName)

    @property
    def state(self):
        """
        State indicate whether given contact was contacted in the notificationFrequency period
        """
        if not self.isActive:
            return 'DISABLED'
        elif self.postponed and self.postponed > timezone.now():
            return 'POSTPONED'
        elif self.lastContact and self.lastContact + datetime.timedelta(hours=self.notificationsFrequency) \
                < timezone.now():
            return 'CONTACT_NEEDED'
        elif not self.lastContact:
            return 'CONTACT_NEEDED'
        else:
            return 'CONTACT_OK'

    # noinspection PyPep8Naming
    @property
    def firstNameDeclension(self):
        """
        :return: firstName in the declension for calling somebody
        """
        return get_name_declension(self.firstName)


class MessageTemplate(models.Model):
    name = models.CharField(max_length=64)
    type = models.CharField(choices=MESSAGE_TYPE, max_length=10)
    tags = models.ManyToManyField(Tag)
    templateBody = models.CharField(max_length=65536)
    templateHeader = models.CharField(max_length=256, blank=True, null=True)

    @property
    def uses(self):
        return self.messages.count()


class Message(models.Model):
    type = models.CharField(choices=MESSAGE_TYPE, max_length=10)
    recipientName = models.CharField(max_length=100)
    contact = models.ForeignKey(Contact, related_name='messages')
    template = models.ForeignKey(MessageTemplate, related_name='messages', null=True)
    recipientEmail = models.EmailField(blank=True, null=True)
    recipientPhone = models.CharField(max_length=16, blank=True, null=True)
    body = models.CharField(max_length=65536)
    header = models.CharField(max_length=256, blank=True, null=True)
    creationDate = models.DateTimeField(auto_now_add=True)
    sendAtDate = models.DateTimeField()
    state = models.CharField(choices=MESSAGE_STATE, max_length=10, default='QUEUED')
