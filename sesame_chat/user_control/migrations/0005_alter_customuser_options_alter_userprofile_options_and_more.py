# Generated by Django 4.1 on 2023-03-16 06:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('user_control', '0004_userprofile'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'ordering': ('created_at',)},
        ),
        migrations.AlterModelOptions(
            name='userprofile',
            options={'ordering': ('created_at',)},
        ),
        migrations.AddField(
            model_name='customuser',
            name='is_online',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]