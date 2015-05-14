import datetime
from django.test import TestCase
from django.utils import timezone
from contacts.models import Contact, Message


class ContactTest(TestCase):
    def test_state_disabled(self):
        # GIVEN: disabled contact
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=timezone.now(),
                          postponed=timezone.now(),
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=False,
                          notes='Test notes')
        contact.save()

        # THEN: state should be disabled
        self.assertEqual(contact.state, 'DISABLED')

    def test_state_postponed(self):
        # GIVEN: active contact with postponed in future
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=timezone.now(),
                          postponed=timezone.now() + datetime.timedelta(hours=24),
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=True,
                          notes='Test notes')
        contact.save()

        # THEN: state should be postponed
        self.assertEqual(contact.state, 'POSTPONED')

    def test_state_postponed_past(self):
        # GIVEN: active contact with postponed in past
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=timezone.now(),
                          postponed=timezone.now() - datetime.timedelta(hours=24),
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=True,
                          notes='Test notes')
        contact.save()

        # THEN: state should not be postponed
        self.assertNotEqual(contact.state, 'POSTPONED')

    def test_state_planned_contact(self):
        # GIVEN: active contact with queued message
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=timezone.now(),
                          postponed=timezone.now() - datetime.timedelta(hours=24),
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=True,
                          notes='Test notes')
        contact.save()
        message = Message(type='SMS', recipientName='Test test', contact=contact, recipientPhone="1234", body="test",
                          sendAtDate=timezone.now(), state="QUEUED")
        message.save()

        # THEN: state should be contact planned
        self.assertEqual(contact.state, 'CONTACT_PLANNED')

    def test_state_contact_needed_last_contact_present(self):
        # GIVEN: active contact with last contact older than notification frequency
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=timezone.now() - datetime.timedelta(hours=36),
                          postponed=timezone.now() - datetime.timedelta(hours=24),
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=True,
                          notes='Test notes')
        contact.save()

        # THEN: state should be contact needed
        self.assertEqual(contact.state, 'CONTACT_NEEDED')

    def test_state_contact_needed_last_contact_absent(self):
        # GIVEN: active contact without last contact
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=None,
                          postponed=timezone.now() - datetime.timedelta(hours=24),
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=True,
                          notes='Test notes')
        contact.save()

        # THEN: state should be contact needed
        self.assertEqual(contact.state, 'CONTACT_NEEDED')

    def test_state_contact_needed_last_contact_recent(self):
        # GIVEN: active contact with last contact not older than notification frequency
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=timezone.now() - datetime.timedelta(hours=12),
                          postponed=None,
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=True,
                          notes='Test notes')
        contact.save()

        # THEN: state should not be contact needed
        self.assertNotEqual(contact.state, 'CONTACT_NEEDED')

    def test_state_contact_ok(self):
        # GIVEN: active contact with last contact not older than notification frequency
        contact = Contact(firstName='Test',
                          lastName='Test',
                          lastContact=timezone.now() - datetime.timedelta(hours=12),
                          postponed=None,
                          email='Test@test.test',
                          phone='12341234',
                          age=33,
                          gender=1,
                          notificationsFrequency=24,
                          isActive=True,
                          notes='Test notes')
        contact.save()

        # THEN: state should be contact ok
        self.assertEqual(contact.state, 'CONTACT_OK')