import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User



@pytest.mark.django_db
def test_register(api_client):
    url = reverse('user-register')
    data = {
        "email": "user@example.com",
        "first_name": "amir",
        "last_name": "ahamdi",
        "password":"test",
    }
    response = api_client.post(url, data)
    assert response.status_code == status.HTTP_200_OK

    
@pytest.mark.django_db
def test_login(api_client, create_user):
    user = create_user(username="user@example.com", email="user@example.com", password="test")
    
    url = reverse('user-login')
    data = {
        "email": "user@example.com",
        "password": "test",
    }
    response = api_client.post(url, data)
    assert response.status_code == status.HTTP_200_OK



@pytest.mark.django_db
class TestProfileEndpoint:

    def test_get_profile(self, api_client, create_user_and_profile):
        user, profile = create_user_and_profile()
        api_client.force_authenticate(user=user)
        
        url = reverse('user-profile')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['first_name'] == profile.first_name
        assert response.data['last_name'] == profile.last_name
        assert response.data['phone_number'] == profile.phone_number

    def test_update_profile(self, api_client, create_user_and_profile):
        user, profile = create_user_and_profile()
        api_client.force_authenticate(user=user)
        
        url = reverse('user-profile')
        update_data = {
            'first_name': 'Updated',
            'phone_number': '9876543210'
        }
        response = api_client.patch(url, update_data)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['first_name'] == 'Updated'
        assert response.data['phone_number'] == '9876543210'
        assert response.data['last_name'] == profile.last_name  # Unchanged

    def test_profile_not_found(self, api_client):
        user = User.objects.create_user(username='noProfileUser', password='testpass123')
        api_client.force_authenticate(user=user)
        
        url = reverse('user-profile')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data['error'] == "Profile not found"

    def test_update_profile_invalid_data(self, api_client, create_user_and_profile):
        user, profile = create_user_and_profile()
        api_client.force_authenticate(user=user)
        
        url = reverse('user-profile')
        invalid_data = {
            'phone_number': 'not a phone number'
        }
        response = api_client.patch(url, invalid_data)
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'phone_number' in response.data

@pytest.mark.django_db
class TestAddressEndpoint:

    def test_get_addresses(self, api_client, create_user_and_address):
        user, address = create_user_and_address()
        api_client.force_authenticate(user=user)
        
        url = reverse('user-address')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == address.name
        assert response.data[0]['detail'] == address.detail

    def test_create_address(self, api_client, create_user):
        user = create_user(username="user@example.com", email="user@example.com", password="test")
        api_client.force_authenticate(user=user)
        
        url = reverse('user-address')
        address_data = {
            'name': 'Office',
            'detail': '456 Avenue, City',
            'latitude': 40.712776,
            'longitude': -74.005974
        }
        response = api_client.post(url, address_data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['name'] == 'Office'
        assert response.data['detail'] == '456 Avenue, City'
        assert response.data['latitude'] == '40.712776'
        assert response.data['longitude'] == '-74.005974'

    def test_update_address(self, api_client, create_user_and_address):
        user, address = create_user_and_address()
        api_client.force_authenticate(user=user)
        
        url = reverse('user-address')
        update_data = {
            'id': address.id,
            'name': 'Updated Home',
            'detail': 'Updated 123 Street, City'
        }
        response = api_client.patch(url, update_data)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Updated Home'
        assert response.data['detail'] == 'Updated 123 Street, City'

    def test_address_not_found(self, api_client, create_user):
        user = create_user(username="user@example.com", email="user@example.com", password="test")
        api_client.force_authenticate(user=user)
        
        url = reverse('user-address')
        update_data = {
            'id': 999,  
            'name': 'Updated Home',
            'detail': 'Updated 123 Street, City'
        }
        response = api_client.patch(url, update_data)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data['error'] == "Address not found"

    def test_create_address_invalid_data(self, api_client, create_user):
        user = create_user(username="user@example.com", email="user@example.com", password="test")
        api_client.force_authenticate(user=user)
        
        url = reverse('user-address')
        invalid_data = {
            'name': '',
            'detail': 'Invalid Address'
        }
        response = api_client.post(url, invalid_data)
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'name' in response.data