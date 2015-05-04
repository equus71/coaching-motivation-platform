# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0003_auto_20150424_1528'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(max_length=10, choices=[(b'EMAIL', b'EMAIL'), (b'SMS', b'SMS')])),
                ('recipientName', models.CharField(max_length=100)),
                ('recipientEmail', models.EmailField(max_length=75, null=True, blank=True)),
                ('recipientPhone', models.CharField(max_length=16, null=True, blank=True)),
                ('body', models.CharField(max_length=65536)),
                ('header', models.CharField(max_length=256)),
                ('creationDate', models.DateTimeField()),
                ('sendAtDate', models.DateTimeField()),
                ('contact', models.ForeignKey(related_name='messages', to='contacts.Contact')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
