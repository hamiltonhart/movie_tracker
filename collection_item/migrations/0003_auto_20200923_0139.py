# Generated by Django 3.1 on 2020-09-23 01:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection_item', '0002_auto_20200816_0331'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='collectionitem',
            options={'ordering': ['movie__title']},
        ),
        migrations.AlterField(
            model_name='collectionitem',
            name='date',
            field=models.DateField(default=datetime.date(2020, 9, 23)),
        ),
    ]
