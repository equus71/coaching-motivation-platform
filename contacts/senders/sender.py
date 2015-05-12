from coaching_motivation_platform import settings
from contacts.senders.mail_sender import MailSender
from contacts.senders.sms_sender import PromoSmsSender


def get_sender_for_message(message):
    if message.type == 'SMS':
        return get_sms_sender_for_message(message)
    if message.type == 'EMAIL':
        return get_email_sender_for_message(message)


def get_sms_sender_for_message(message):
    if settings.SMS_SENDER == 'PROMOSMS':
        return PromoSmsSender()
    raise Exception("SMS sender not defined")


def get_email_sender_for_message(message):
    return MailSender()