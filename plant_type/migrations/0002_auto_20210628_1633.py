# Generated by Django 3.1 on 2021-06-28 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plant_type', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planttype',
            name='type_label',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]