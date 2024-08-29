import pytest
from django.contrib.auth.models import User
from decimal import Decimal
from profile.models import Profile, Address

@pytest.mark.django_db
class TestModels:

    # Profile Tests
    def test_profile_creation(self):
        # Given
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        
        # When
        profile = Profile.objects.create(
            user=user,
            first_name='Test',
            last_name='User',
            phone_number='1234567890'
        )
        
        # Then
        assert profile.user.username == 'testuser'
        assert str(profile) == 'testuser'

    # Address Tests
    def test_address_creation(self):
        # Given
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        
        # When
        address = Address.objects.create(
            user=user,
            name='Home',
            detail='123 Test St',
            latitude=40.7128,
            longitude=-74.0060
        )
        
        # Then
        assert str(address) == 'Home--Home'

