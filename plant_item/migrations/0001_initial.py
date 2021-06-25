# Generated by Django 3.1 on 2021-06-24 04:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('plant', '0001_initial'),
        ('image', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlantItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(default=None, max_length=200)),
                ('wish_list', models.BooleanField(default=False)),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='image.image')),
                ('plant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plants', to='plant.plant')),
            ],
        ),
    ]
