# Generated by Django 3.0.8 on 2020-08-03 03:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection_item', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collectionitem',
            name='date',
            field=models.DateField(default=datetime.date(2020, 8, 3)),
        ),
    ]