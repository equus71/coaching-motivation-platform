# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0005_auto_20150429_0802'),
    ]

    operations = [
        migrations.CreateModel(
            name='MessageTemplate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=64)),
                ('type', models.CharField(max_length=10, choices=[(b'EMAIL', b'EMAIL'), (b'SMS', b'SMS')])),
                ('templateBody', models.CharField(max_length=65536)),
                ('templateHeader', models.CharField(max_length=256)),
                ('tags', models.ManyToManyField(to='contacts.Tag')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
