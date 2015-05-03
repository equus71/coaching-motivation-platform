from contacts.senders.mail_sender import MailSender


def get_sender_for_message(message):
    if message.type == 'SMS':
        return get_sms_sender_for_message(message)
    if message.type == 'EMAIL':
        return get_email_sender_for_message(message)


def get_sms_sender_for_message(message):
    # TODO: make sms sender
    return MailSender()


def get_email_sender_for_message(message):
    return MailSender()