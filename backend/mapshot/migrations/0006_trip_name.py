# Generated by Django 3.0.8 on 2020-07-22 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapshot', '0005_marker_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='name',
            field=models.CharField(default=None, max_length=220),
        ),
    ]
