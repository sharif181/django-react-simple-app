# Generated by Django 3.1.5 on 2021-01-09 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentinfo',
            name='img',
            field=models.ImageField(default='default.jpg', upload_to='images/'),
        ),
    ]
