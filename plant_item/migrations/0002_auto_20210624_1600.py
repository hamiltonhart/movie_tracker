# Generated by Django 3.1 on 2021-06-24 16:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('image', '0001_initial'),
        ('plant_item', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plantitem',
            name='image',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='image.image'),
        ),
    ]
