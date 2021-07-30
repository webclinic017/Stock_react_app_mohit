# Generated by Django 3.2.2 on 2021-06-09 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InstrumentList',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('instrument_token', models.CharField(max_length=80)),
                ('exchange_token', models.CharField(max_length=80)),
                ('tradingsymbol', models.CharField(max_length=80)),
                ('name', models.CharField(blank=True, max_length=80, null=True)),
            ],
        ),
    ]