# Generated by Django 3.1 on 2020-09-23 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0002_auto_20200812_0435'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='release_year',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='summary',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='tmdb_id',
            field=models.IntegerField(null=True),
        ),
    ]
