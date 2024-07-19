from django.db import models
from django.contrib.auth.models import User


"""
CLASSES:
        Users(Profile): id - firstName - lastName - image - phoneNumber - email - addresses - orders. -*-
        Address: id - name - detail - latitude - longitude - user. -*-
        Orders: id - user - address - meals - totalPrice - status(submit, cooking, onWay, delivery) - createdAt.  -*-
        Meals: id - name - rate - duration - calories - weight - vegetables - price - image - category. -*-
        Vegtables: id - name - emoji(image). -*-
        
"""


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    addresses = models.ManyToManyField('Address', related_name='profiles')

    def __str__(self):
        return self.user.username


class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    emoji = models.ImageField(upload_to='ingredients/')
    
    def __str__(self):
        return self.name


class Meal(models.Model):
    name = models.CharField(max_length=100)
    rate = models.DecimalField(max_digits=3, decimal_places=2)
    duration = models.IntegerField()  # in minutes
    calories = models.IntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # in grams
    ingredients = models.ManyToManyField(Ingredient, related_name='meals')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='meals/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity_available = models.IntegerField(default=50)
    
    def __str__(self):
        return self.name


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    name = models.CharField(max_length=100)
    detail = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    
    def __str__(self):
        return str(f"{self.name}--{self.name}")


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    meals = models.ManyToManyField(Meal, through='MealItem')
    created_at = models.DateTimeField(auto_now=True)

class MealItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

class Order(models.Model):
    STATUS_CHOICES = [
        ('submit', 'Submit'),
        ('cooking', 'Cooking'),
        ('onWay', 'On Way'),
        ('delivery', 'Delivery')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    meals = models.ManyToManyField(Meal, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='submit')
    created_at = models.DateTimeField(auto_now_add=True)