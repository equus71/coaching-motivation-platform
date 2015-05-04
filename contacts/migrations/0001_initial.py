# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('firstName', models.CharField(max_length=200)),
                ('lastName', models.CharField(max_length=200)),
                ('lastContact', models.DateTimeField(null=True, verbose_name=b'Last contact made with the contact', blank=True)),
                ('postponed', models.DateTimeField(null=True, verbose_name=b'Contact with the contact postponed till', blank=True)),
                ('email', models.EmailField(max_length=75)),
                ('phone', models.CharField(max_length=16)),
                ('age', models.IntegerField()),
                ('gender', models.IntegerField()),
                ('notificationsFrequency', models.IntegerField()),
                ('tags', models.CharField(max_length=4096)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
