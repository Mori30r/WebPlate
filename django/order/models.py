from django.db import models
from django.contrib.auth.models import User


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


class Order(models.Model):
    STATUS_CHOICES = [
        ('submit', 'Submit'),
        ('cooking', 'Cooking'),
        ('onWay', 'On Way'),
        ('delivery', 'Delivery')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    address = models.ForeignKey("profile.Address", on_delete=models.CASCADE)
    meals = models.ManyToManyField(Meal, through='OrderItem', related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='submit')
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
