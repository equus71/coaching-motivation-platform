# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0008_contact_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='template',
            field=models.ForeignKey(related_name='messages', to='contacts.MessageTemplate', null=True),
            preserve_default=True,
        ),
    ]
