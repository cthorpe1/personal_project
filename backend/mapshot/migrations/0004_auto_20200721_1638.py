# Generated by Django 3.0.7 on 2020-07-21 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapshot', '0003_auto_20200721_1637'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marker',
            name='lat',
            field=models.DecimalField(decimal_places=8, max_digits=11),
        ),
        migrations.AlterField(
            model_name='marker',
            name='lng',
            field=models.DecimalField(decimal_places=8, max_digits=11),
        ),
    ]