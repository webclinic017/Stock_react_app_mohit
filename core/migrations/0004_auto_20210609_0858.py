# Generated by Django 3.2.2 on 2021-06-09 08:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_remove_portfolio_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='name',
            field=models.CharField(default='', max_length=90),
        ),
        migrations.AlterField(
            model_name='my_stocks',
            name='portfolio',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='stock', to='core.portfolio'),
        ),
    ]