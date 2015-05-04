# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0009_message_template'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='state',
            field=models.CharField(default=b'QUEUED', max_length=10, choices=[(b'SEND', b'SEND'), (b'QUEUED', b'QUEUED')]),
            preserve_default=True,
        ),
    ]
