from django.db import models
from django.db.models import F
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

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

    def reduce_quantity(self, quantity):
        if self.quantity_available < quantity:
            raise ValidationError({"message": f"Not enough quantity available for {self.name} -- ID {self.id}"})
        self.quantity_available = F('quantity_available') - quantity
        self.save(update_fields=["quantity_available"])

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
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='submit')
    created_at = models.DateTimeField(auto_now_add=True)

    def add_items(self, items_data):
        total_price = 0
        for item_data in items_data:
            meal = Meal.objects.select_for_update().get(id=item_data['meal'].id)
            quantity = item_data['quantity']
            meal.reduce_quantity(quantity)
            OrderItem.objects.create(order=self, meal=meal, quantity=quantity)
            total_price += meal.price * quantity
        self.total_price = total_price
        self.save(update_fields=["total_price"])
        return self


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)
