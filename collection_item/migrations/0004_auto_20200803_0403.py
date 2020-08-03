# Generated by Django 3.0.8 on 2020-08-03 04:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0002_auto_20200803_0334'),
        ('movie_collections', '0001_initial'),
        ('collection_item', '0003_auto_20200803_0348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collectionitem',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movie_collection', to='movie.Movie'),
        ),
        migrations.AlterField(
            model_name='collectionitem',
            name='movie_collection',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movies', to='movie_collections.MovieCollection'),
        ),
    ]
