# Generated by Django 3.1 on 2021-06-25 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plant', '0002_auto_20210625_1811'),
    ]

    operations = [
        migrations.AddField(
            model_name='plant',
            name='comments',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='plant',
            name='watering_instructions',
            field=models.TextField(default=''),
        ),
    ]
