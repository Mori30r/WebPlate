# Generated by Django 5.0.7 on 2024-08-24 07:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_meal_discount_percentage_meal_discounted_price_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='discountcode',
            name='used',
        ),
        migrations.AddField(
            model_name='discountcode',
            name='used_by_users',
            field=models.ManyToManyField(blank=True, related_name='used_discount_codes', to=settings.AUTH_USER_MODEL),
        ),
    ]