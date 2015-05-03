from django.core.mail import send_mail
from django.utils import timezone
from coaching_motivation_platform import settings


class MailSender(object):
    def send(self, message, contact):
        msg_count = send_mail(subject=message.header, message=message.body, from_email=self.sender_email,
                              recipient_list=[message.recipientEmail])

        if msg_count > 0:
            contact.lastContact = timezone.now()
            message.state = "SEND"

        return message, contact

    @property
    def sender_email(self):
        return settings.EMAIL_DEFAULT_SENDER