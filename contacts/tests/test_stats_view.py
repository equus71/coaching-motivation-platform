import datetime
from django.test import TestCase
from django.utils import timezone
from contacts.models import Contact, Message
from contacts.views import StatsView


class StatsViewTest(TestCase):
    def test_contact_needed_detect_not_contacted_at_all(self):
        # GIVEN: new contact without last contact date
        contact = Contact(firstName='Test', lastName='Test', age=33, notificationsFrequency=24, gender=1, isActive=True)
        contact.save()

        # WHEN: run get_contact_needed
        results = StatsView.get_contact_needed()

        # THEN: expect the given contact in the results
        self.assertIn(contact, results)

    def test_contact_not_needed_not_detected(self):
        # GIVEN: new contact with last contact date
        contact = Contact(firstName='Test', lastName='Test', age=33, notificationsFrequency=24, gender=1, isActive=True,
                          lastContact=timezone.now())
        contact.save()

        # WHEN: run get_contact_needed
        results = StatsView.get_contact_needed()

        # THEN: expect the given contact NOT in the results
        self.assertNotIn(contact, results)

    def test_contact_needed_but_scheduled_not_detected(self):
        # GIVEN: new contact without last contact date but with scheduled message
        contact = Contact(firstName='Test', lastName='Test', age=33, notificationsFrequency=24, gender=1, isActive=True,
                          lastContact=timezone.now())
        contact.save()
        message = Message(type='SMS', recipientName='Test test', contact=contact, recipientPhone="1234", body="test",
                          sendAtDate=timezone.now(), state="QUEUED")
        message.save()

        # WHEN: run get_contact_needed
        results = StatsView.get_contact_needed()

        # THEN: expect the given contact NOT in the results
        self.assertNotIn(contact, results)

    def test_contact_needed_but_postponed(self):
        # GIVEN: new contact without last contact date and postponed in future
        contact = Contact(firstName='Test', lastName='Test', age=33, notificationsFrequency=24, gender=1, isActive=True,
                          postponed=timezone.now()+datetime.timedelta(days=1))
        contact.save()

        # WHEN: run get_contact_needed
        results = StatsView.get_contact_needed()

        # THEN: expect the given contact NOT in the results
        self.assertNotIn(contact, results)

    def test_contact_needed_postponed_but_active_again(self):
        # GIVEN: new contact without last contact date and postponed in past
        contact = Contact(firstName='Test', lastName='Test', age=33, notificationsFrequency=24, gender=1, isActive=True,
                          postponed=timezone.now()-datetime.timedelta(days=1))
        contact.save()

        # WHEN: run get_contact_needed
        results = StatsView.get_contact_needed()

        # THEN: expect the given contact in the results
        self.assertIn(contact, results)

    def test_contact_needed_but_postponed_with_last_contact(self):
        # GIVEN: new contact with last contact date and postponed in future
        contact = Contact(firstName='Test', lastName='Test', age=33, notificationsFrequency=24, gender=1, isActive=True,
                          postponed=timezone.now()+datetime.timedelta(days=1),
                          lastContact=timezone.now()-datetime.timedelta(days=2))
        contact.save()

        # WHEN: run get_contact_needed
        results = StatsView.get_contact_needed()

        # THEN: expect the given contact NOT in the results
        self.assertNotIn(contact, results)

    def test_contact_needed_postponed_but_active_again_with_last_contact(self):
        # GIVEN: new contact with last contact date and postponed in past
        contact = Contact(firstName='Test', lastName='Test', age=33, notificationsFrequency=24, gender=1, isActive=True,
                          postponed=timezone.now()-datetime.timedelta(days=1),
                          lastContact=timezone.now()-datetime.timedelta(days=2))
        contact.save()

        # WHEN: run get_contact_needed
        results = StatsView.get_contact_needed()

        # THEN: expect the given contact in the results
        self.assertIn(contact, results)