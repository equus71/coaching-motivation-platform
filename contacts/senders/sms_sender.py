import urllib
from django.utils import timezone
import requests
import xmltodict
from coaching_motivation_platform import settings


class PromoSmsSender(object):
    # TODO: add cfg for longer smses

    def prepare_initial_settings(self):
        promosms_request_dict = {
            'login': settings.PROMOSMS_LOGIN,
            'pass': settings.PROMOSMS_PW,
            'return': 'xml'
        }
        if settings.PROMOSMS_FROM:
            promosms_request_dict['from'] = settings.PROMOSMS_FROM
        if settings.PROMOSMS_TYPE:
            promosms_request_dict['type'] = settings.PROMOSMS_TYPE
        return promosms_request_dict

    def send(self, message, contact):
        promosms_request_dict = self.prepare_initial_settings()

        try:
            promosms_request_dict['msg'] = message.body.encode('utf8')
            promosms_request_dict['to'] = message.recipientPhone
        except UnicodeEncodeError:
        # TODO: add logging of the request format errors
            return message, contact

        try:
            response = requests.get(settings.PROMOSMS_SMS_ENDPOINT + "?" + urllib.urlencode(promosms_request_dict))
        except TypeError:
            # TODO: add logging of the request format errors
            return message, contact

        if response.status_code == 200:
            response_dict = xmltodict.parse(response.text)
            if response_dict.get('message', {}).get('sms', {}).get('status') == '001':
                contact.lastContact = timezone.now()
                message.state = "SEND"
            else:
                # TODO: add logging of the send errors
                pass
        else:
            # TODO: add logging of the communication errors
            pass

        return message, contact
