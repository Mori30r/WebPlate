import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from order.models import Category, Meal, Order, OrderItem, DiscountCode
from profile.models import Address
from decimal import Decimal
from django.utils import timezone


@pytest.mark.django_db
class TestAPIEndpoints:
        
    
    
    def test_meal_list(self, api_client, meal):
        """
        Ensure we can get the list of meals.
        """
        # Given
        url = reverse('meal-list')

        # When
        response = api_client.get(url)

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) > 0
        assert response.data['results'][0]['name'] == meal.name
        

    def test_meal_detail(self, api_client, meal):
        """
        Ensure we can get the details of a specific meal.
        """
        # Given
        url = reverse('meal-detail', kwargs={'pk': meal.id})

        # When
        response = api_client.get(url)

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == meal.name
        assert response.data['price'] == str(meal.price)

    def test_user_order_list(self, api_client, user, meal, address):
        """
        Ensure a user can get a list of their own orders.
        """
        # Given
        api_client.force_authenticate(user=user)
        order = Order.objects.create(user=user, address=address)
        order.add_items([{'meal': meal, 'quantity': 2}])
        url = reverse('order-list')

        # When
        response = api_client.get(url)

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) > 0  # Assuming the user has at least one order
        assert response.data['results'][0]['user'] == user.id

    def test_user_order_detail(self, api_client, user, meal, address):
        """
        Ensure a user can get the details of a specific order.
        """
        # Given
        api_client.force_authenticate(user=user)
        order = Order.objects.create(user=user, address=address)
        order.add_items([{'meal': meal, 'quantity': 2}])
        url = reverse('order-detail', kwargs={'pk': order.id})

        # When
        response = api_client.get(url)

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert response.data['user'] == user.id
        assert len(response.data['order_items']) == 1
        assert response.data['order_items'][0]['meal_name'] == meal.name

    def test_category_list(self, api_client, category):
        # Given
        url = reverse('category-list')

        # When
        response = api_client.get(url)

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['name'] == category.name

    def test_meal_list_by_category(self, api_client, category, meal):
        # Given
        url = reverse('meal-by-category', kwargs={'category_id': category.id})

        # When
        response = api_client.get(url)

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['name'] == meal.name

    def test_create_order(self, api_client, user, meal, address):
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-create-order')
        order_data = {
            "user": user.id, 
            "address": address.id,
            "order_items": [
                {"meal": meal.id, "quantity": 2}
            ],
            "discount_code": ""  # If discount_code is optional, you may omit it.
        }

        # When
        response = api_client.post(url, data=order_data, format='json')
        
        # Then
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['total_price'] == str(Decimal('18.00'))

    def test_create_order_with_invalid_discount_code(self, api_client, user, meal, address):
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-create-order')
        order_data = {
            "user": user.id, 
            "address": address.id,
            "order_items": [
                {"meal": meal.id, "quantity": 2}
            ],
            "discount_code": "INVALIDCODE"
        }

        # When
        response = api_client.post(url, data=order_data, format='json')

        # Then
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "discount_code" in response.data
    
    
    def test_create_order_with_valid_discount_code(self, api_client, user, meal_without_discount, address, discount_code):
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-create-order')
        order_data = {
            "user": user.id,
            "address": address.id,
            "order_items": [
                {"meal": meal_without_discount.id, "quantity": 2}
            ],
            "discount_code": discount_code.code
        }

        # When
        response = api_client.post(url, data=order_data, format='json')

        # Then
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['total_price'] == str(Decimal('10.00'))  # 20.00 - 10.00 = 10.00
        assert response.data['discount_amount'] == str(discount_code.discount_value)
        
    
    def test_create_order_with_discount_on_discounted_meal(self, api_client, user, meal, address, discount_code):
        """
        Check that a discount code cannot be applied to an order with meals that already have a discount.
        """
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-create-order')
        order_data = {
            "user": user.id,
            "address": address.id,
            "order_items": [
                {"meal": meal.id, "quantity": 2}
            ],
            "discount_code": discount_code.code
        }

        # When
        response = api_client.post(url, data=order_data, format='json')

        # Then
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "message" in response.data
        assert response.data["message"] == "Discount code cannot be applied as some meals already have a discount."
        
    
    def test_discount_code_used_once(self, api_client, user, meal_without_discount, address, discount_code):
        """
        Ensure a user cannot use a discount code more than once.
        """
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-create-order')

        # First time using the discount code
        order_data = {
            "user": user.id,
            "address": address.id,
            "order_items": [
                {"meal": meal_without_discount.id, "quantity": 5}
            ],
            "discount_code": discount_code.code
        }
        response = api_client.post(url, data=order_data, format='json')
        print(response.data)
        
        assert response.status_code == status.HTTP_201_CREATED

        # Second time using the same discount code
        response = api_client.post(url, data=order_data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "message" in response.data
        assert response.data["message"] == "You have already used this discount code."
        
    
    def test_discount_code_minimum_purchase_success(self, api_client, user, meal_without_discount, address, discount_code):
            
        """
        Ensure discount code is applied successfully when minimum purchase amount is met.
        """
        
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-create-order')

        # Successful case where total price meets the minimum purchase amount
        order_data = {
            "user": user.id,
            "address": address.id,
            "order_items": [
                {"meal": meal_without_discount.id, "quantity": 5}  # Assuming meal price * 5 meets the minimum purchase
            ],
            "discount_code": discount_code.code
        }
        response = api_client.post(url, data=order_data, format='json')
        print(response.data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Decimal(response.data["discount_amount"]) > 0

    def test_discount_code_minimum_purchase_failure(self, api_client, user, meal_without_discount, address, discount_code):
        """
        Ensure discount code is not applied if minimum purchase amount is not met.
        """
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-create-order')

        # Failure case where total price is less than the minimum purchase amount
        order_data = {
            "user": user.id,
            "address": address.id,
            "order_items": [
                {"meal": meal_without_discount.id, "quantity": 1}  # Assuming meal price * 1 is less than the minimum purchase
            ],
            "discount_code": discount_code.code
        }
        response = api_client.post(url, data=order_data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "message" in response.data
        assert response.data["message"] == "Minimum purchase amount not reached for this discount code."

        

    def test_meal_availability(self, api_client, user, meal):
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('order-meal-availability', kwargs={'pk': meal.id})

        # When
        response = api_client.get(url)

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert response.data['quantity_available'] == meal.quantity_available

    def test_get_valid_discount_code(self, api_client, user, discount_code):
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('discount-code-detail')

        # When
        response = api_client.get(url, {'code': discount_code.code})

        # Then
        assert response.status_code == status.HTTP_200_OK
        assert response.data['value'] == str(discount_code.discount_value)

    def test_get_invalid_discount_code(self, api_client, user):
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('discount-code-detail')

        # When
        response = api_client.get(url, {'code': 'INVALIDCODE'})

        # Then
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_get_expired_discount_code(self, api_client, user, expired_discount_code):
        # Given
        api_client.force_authenticate(user=user)
        url = reverse('discount-code-detail')

        # When
        response = api_client.get(url, {'code': expired_discount_code.code})

        # Then
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "This discount code has expired." in response.data['error']