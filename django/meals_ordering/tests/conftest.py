import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from meals_ordering.models import Profile, Address


@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def make_user(**kwargs):
        user = User.objects.create_user(**kwargs)
        user.set_password(kwargs['password'])
        user.save()
        return user
    return make_user


@pytest.fixture
def create_user_and_profile():
    def make_user_and_profile(**kwargs):
        user = User.objects.create_user(
            username=kwargs.get('username', 'testuser'),
            email=kwargs.get('email', 'testuser@example.com'),
            password=kwargs.get('password', 'testpass123')
        )
        profile = Profile.objects.create(
            user=user,
            first_name=kwargs.get('first_name', 'Test'),
            last_name=kwargs.get('last_name', 'User'),
            phone_number=kwargs.get('phone_number', '1234567890')
        )
        return user, profile
    return make_user_and_profile

@pytest.fixture
def create_user_and_address(create_user):
    def create_user_and_address_func():
        user = create_user(username="user@example.com", email="user@example.com", password="test")
        address = Address.objects.create(
            user=user,
            name="Home",
            detail="123 Street, City",
            latitude=34.052235,
            longitude=-118.243683
        )
        return user, address
    return create_user_and_address_func