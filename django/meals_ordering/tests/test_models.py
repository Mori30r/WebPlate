import pytest
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from decimal import Decimal
from meals_ordering.models import Profile, Category, Ingredient, Meal, Address, Cart, MealItem, Order

@pytest.mark.django_db
class TestModels:

    def test_profile_creation(self):
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        profile = Profile.objects.create(
            user=user,
            first_name='Test',
            last_name='User',
            phone_number='1234567890'
        )
        assert profile.user.username == 'testuser'
        assert str(profile) == 'testuser'

    def test_category_creation(self):
        category = Category.objects.create(name='Test Category')
        assert str(category) == 'Test Category'

    def test_ingredient_creation(self):
        ingredient = Ingredient.objects.create(name='Test Ingredient')
        assert str(ingredient) == 'Test Ingredient'

        
    def test_meal_creation(self):
        category = Category.objects.create(name='Test Category')
        meal = Meal.objects.create(
            name='Test Meal',
            rate=Decimal('4.5'),
            duration=30,
            calories=300,
            weight=Decimal('250.00'),
            price=Decimal('9.99'),
            category=category,
            quantity_available=50
        )
        assert str(meal) == 'Test Meal'
        assert meal.rate == Decimal('4.50')
        assert meal.price == Decimal('9.99')

    def test_address_creation(self):
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        address = Address.objects.create(
            user=user,
            name='Home',
            detail='123 Test St',
            latitude=40.7128,
            longitude=-74.0060
        )
        assert str(address) == 'Home--Home'

    def test_cart_creation(self):
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        cart = Cart.objects.create(user=user)
        assert cart.user == user

    def test_meal_item_creation(self):
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        cart = Cart.objects.create(user=user)
        category = Category.objects.create(name='Test Category')
        meal = Meal.objects.create(
            name='Test Meal',
            rate=4.5,
            duration=30,
            calories=300,
            weight=250.00,
            price=9.99,
            category=category,
            quantity_available=50
        )
        meal_item = MealItem.objects.create(cart=cart, meal=meal, quantity=2)
        assert meal_item.quantity == 2

    def test_order_creation(self):
        user = User.objects.create_user('testuser', 'test@example.com', 'password123')
        address = Address.objects.create(
            user=user,
            name='Home',
            detail='123 Test St',
            latitude=Decimal('40.7128'),
            longitude=Decimal('-74.0060')
        )
        order = Order.objects.create(
            user=user,
            address=address,
            total_price=Decimal('19.99'),
            status='submit'
        )
        assert order.status == 'submit'
        assert order.total_price == Decimal('19.99')