from decimal import Decimal
from django.utils import timezone
import pytest
from rest_framework.exceptions import ValidationError
from order.models import Category, DiscountCode, Ingredient, Meal, Order
from profile.models import Address
from django.contrib.auth.models import User



@pytest.mark.django_db
class TestModels:
    
    def test_category_creation(self):
        # Given
        category = Category.objects.create(name='Fast Food')
        
        # Then
        assert str(category) == 'Fast Food'


    def test_ingredient_creation(self):
        # Given
        ingredient = Ingredient.objects.create(name='Tomato')
        
        # Then
        assert str(ingredient) == 'Tomato'

    def test_meal_creation_and_discount(self):
        # Given
        category = Category.objects.create(name='Fast Food')
        ingredient = Ingredient.objects.create(name='Tomato')
        meal = Meal.objects.create(
            name='Burger',
            rate=Decimal('4.5'),
            duration=15,
            calories=300,
            weight=Decimal('250'),
            price=Decimal('10.00'),
            discount_percentage=Decimal('10.00'),
            category=category
        )
        meal.ingredients.add(ingredient)
        
        # When
        discounted_price = meal.calculate_discounted_price()
        
        # Then
        assert str(meal) == 'Burger'
        assert discounted_price == Decimal('9.00')
        assert meal.get_final_price() == Decimal('9.00')

    def test_meal_reduce_quantity(self):
        # Given
        category = Category.objects.create(name='Fast Food')
        meal = Meal.objects.create(
            name='Burger',
            rate=Decimal('4.5'),
            duration=15,
            calories=300,
            weight=Decimal('250'),
            price=Decimal('10.00'),
            quantity_available=5,
            category=category
        )
        
        # When
        meal.reduce_quantity(3)
        
        # Then
        meal.refresh_from_db()
        assert meal.quantity_available == 2

    def test_meal_reduce_quantity_insufficient_stock(self):
        # Given
        category = Category.objects.create(name='Fast Food')
        meal = Meal.objects.create(
            name='Burger',
            rate=Decimal('4.5'),
            duration=15,
            calories=300,
            weight=Decimal('250'),
            price=Decimal('10.00'),
            quantity_available=2,
            category=category
        )
        
        # Then
        with pytest.raises(ValidationError):
            meal.reduce_quantity(3)

    def test_order_creation_and_total_price(self):
        # Given
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        category = Category.objects.create(name='Fast Food')
        meal = Meal.objects.create(
            name='Burger',
            rate=Decimal('4.5'),
            duration=15,
            calories=300,
            weight=Decimal('250'),
            price=Decimal('10.00'),
            category=category
        )
        address = Address.objects.create(
            user=user,
            name='Home',
            detail='123 Test St',
            latitude=40.7128,
            longitude=-74.0060
        )
        
        # When
        order = Order.objects.create(user=user, address=address)
        order.add_items([{'meal': meal, 'quantity': 2}])
        
        # Then
        order.refresh_from_db()
        assert order.total_price == Decimal('20.00')

    def test_order_apply_discount(self):
        # Given
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        category = Category.objects.create(name='Fast Food')
        meal = Meal.objects.create(
            name='Burger',
            rate=Decimal('4.5'),
            duration=15,
            calories=300,
            weight=Decimal('250'),
            price=Decimal('10.00'),
            category=category
        )
        address = Address.objects.create(
            user=user,
            name='Home',
            detail='123 Test St',
            latitude=40.7128,
            longitude=-74.0060
        )
        discount_code = DiscountCode.objects.create(
            discount_type='amount',
            discount_value=Decimal('5.00'),
            min_purchase_amount=Decimal('10.00'),
            expiration_date=timezone.now() + timezone.timedelta(days=1),
            code='DISCOUNT5'
        )
        
        # When
        order = Order.objects.create(user=user, address=address, discount_code=discount_code)
        order.add_items([{'meal': meal, 'quantity': 1}])
        
        # Then
        order.refresh_from_db()
        assert order.discount_amount == Decimal('5.00')
        assert order.total_price == Decimal('5.00')

    def test_discount_code_usage_limit(self):
        # Given
        user1 = User.objects.create_user('testuser1', 'test1@example.com', 'password123')
        user2 = User.objects.create_user('testuser2', 'test2@example.com', 'password123')
        discount_code = DiscountCode.objects.create(
            discount_type='amount',
            discount_value=Decimal('5.00'),
            min_purchase_amount=Decimal('10.00'),
            expiration_date=timezone.now() + timezone.timedelta(days=1),
            usage_limit=1,
            code='LIMITEDUSE'
        )
        
        # When
        discount_code.is_valid(user1)
        discount_code.used_by_users.add(user1)
        discount_code.save()

        # Then
        with pytest.raises(ValidationError):
            discount_code.is_valid(user2)