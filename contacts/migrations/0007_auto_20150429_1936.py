# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0006_messagetemplate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messagetemplate',
            name='templateHeader',
            field=models.CharField(max_length=256, null=True, blank=True),
            preserve_default=True,
        ),
    ]
