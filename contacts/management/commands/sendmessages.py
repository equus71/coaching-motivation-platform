import datetime
from django.core.management.base import BaseCommand
from contacts.models import Message
from contacts.senders.sender import get_sender_for_message


class Command(BaseCommand):
    help = "Send the messages with the QUEUED state"

    def handle(self, *args, **options):
        messages_in_queue = Message.objects.filter(state='QUEUED', sendAtDate__lt=datetime.datetime.now())

        for message in messages_in_queue:
            sender = get_sender_for_message(message)

            message, contact = sender.send(message, message.contact)

            # save after each message sending
            message.save()
            contact.save()

        send_messages = [msg for msg in messages_in_queue if msg.state == "SEND"]
        print len(send_messages) + " messages send (from " + len(messages_in_queue) + " messages in queue)"