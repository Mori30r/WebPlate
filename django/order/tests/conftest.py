import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from order.models import Category, Meal, DiscountCode, Ingredient
from profile.models import Address
from decimal import Decimal
from django.utils import timezone


@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user():
    return User.objects.create_user(username='testuser', email='test@example.com', password='password123')

@pytest.fixture
def category():
    return Category.objects.create(name='Fast Food')

@pytest.fixture
def ingredient():
    return Ingredient.objects.create(name='Tomato')

@pytest.fixture
def meal(category):
    return Meal.objects.create(
        name='Burger',
        rate=Decimal('4.5'),
        duration=15,
        calories=300,
        weight=Decimal('250'),
        price=Decimal('10.00'),
        discount_percentage=Decimal('10.00'),
        quantity_available=5,
        category=category
    )



@pytest.fixture
def address(user):
    return Address.objects.create(
        user=user,
        name='Home',
        detail='123 Test St',
        latitude=40.7128,
        longitude=-74.0060
    )

@pytest.fixture
def discount_code():
    return DiscountCode.objects.create(
        code='DISCOUNT10',
        discount_type='amount',
        discount_value=Decimal('10.00'),
        min_purchase_amount=Decimal('20.00'),
        expiration_date=timezone.now() + timezone.timedelta(days=1)
    )

@pytest.fixture
def expired_discount_code():
    return DiscountCode.objects.create(
        code='DISCOUNT10',
        discount_type='amount',
        discount_value=Decimal('10.00'),
        min_purchase_amount=Decimal('20.00'),
        expiration_date=timezone.now() - timezone.timedelta(days=1)  # Expired
    )

@pytest.fixture
def limited_discount_code():
    return DiscountCode.objects.create(
        code='LIMITEDUSE',
        discount_type='amount',
        discount_value=Decimal('5.00'),
        min_purchase_amount=Decimal('10.00'),
        expiration_date=timezone.now() + timezone.timedelta(days=1),
        usage_limit=1
    )


@pytest.fixture
def meal_without_discount(category):
    return Meal.objects.create(
        name='Burger',
        rate=Decimal('4.5'),
        duration=15,
        calories=300,
        weight=Decimal('250'),
        price=Decimal('10.00'),
        discount_percentage=None,  # No discount on the meal
        quantity_available=5,
        category=category
    )