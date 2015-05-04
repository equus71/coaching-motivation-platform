# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0007_auto_20150429_1936'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='notes',
            field=models.CharField(max_length=4096, null=True, blank=True),
            preserve_default=True,
        ),
    ]
