# Generated by Django 3.2.2 on 2021-06-10 09:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_user_active_portfolio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='active_portfolio',
        ),
    ]