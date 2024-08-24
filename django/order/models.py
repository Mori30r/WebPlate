from django.utils import timezone
import random
import string
from django.db import models
from django.db.models import F
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
class Category(models.Model):
    name = models.CharField(max_length=100)
    emoji = models.ImageField(upload_to='category/', null=True)

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
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True) 
    image = models.ImageField(upload_to='meals/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity_available = models.IntegerField(default=50)

    def __str__(self):
        return self.name

    def calculate_discounted_price(self):
        if self.discount_percentage:
            self.discounted_price = self.price * (1 - (self.discount_percentage / 100))
        else:
            self.discounted_price = None
        return self.discounted_price

    def get_final_price(self):
        return self.discounted_price if self.discounted_price else self.price

    def save(self, *args, **kwargs):
        self.calculate_discounted_price()
        super().save(*args, **kwargs)

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
    discount_code = models.ForeignKey('DiscountCode', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='submit')
    created_at = models.DateTimeField(auto_now_add=True)

    def apply_discount(self):
        if self.discount_code:
            for order_item in self.order_items.all():
                if order_item.meal.discount_percentage:
                    raise ValidationError({"message": "Discount code cannot be applied as some meals already have a discount."})
                
                self.discount_code.is_valid(self.user)

            if self.total_price >= self.discount_code.min_purchase_amount:
                self.discount_amount = self.discount_code.calculate_discount(self.total_price)
                self.total_price -= self.discount_amount
                # Mark discount code as used by this user
                self.discount_code.used_by_users.add(self.user)
                self.discount_code.save()
            else:
                raise ValidationError({"message": "Minimum purchase amount not reached for this discount code."})

    def add_items(self, items_data):
        total_price = 0
        for item_data in items_data:
            meal = Meal.objects.select_for_update().get(id=item_data['meal'].id)
            quantity = item_data['quantity']
            meal.reduce_quantity(quantity)
            OrderItem.objects.create(order=self, meal=meal, quantity=quantity)
            total_price += meal.get_final_price() * quantity
        self.total_price = total_price
        self.apply_discount()
        self.save(update_fields=["total_price", "discount_amount"])
        return self


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(default=1)

    @property
    def total_price(self):
        return self.meal.get_final_price() * self.quantity


class DiscountCode(models.Model):
    DISCOUNT_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('amount', 'Amount'),
    ]

    code = models.CharField(max_length=50, unique=True, blank=True)
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPE_CHOICES)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)  # This can be percentage or amount
    applicable_meal = models.ForeignKey(Meal, on_delete=models.CASCADE, null=True, blank=True, related_name='discount_codes')
    applicable_category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='discount_codes')
    min_purchase_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=500000)
    expiration_date = models.DateTimeField()
    used_by_users = models.ManyToManyField(User, blank=True, related_name='used_discount_codes')  # Track which users have used the discount code
    usage_limit = models.IntegerField(null=True, blank=True)  # Optional limit on total usage

    def __str__(self):
        return self.code
    
    def usage_count(self):
        return self.used_by_users.count()
    
    def generate_discount_code(self):
        return ''.join(random.choices(string.ascii_uppercase, k=6))
        
    def is_valid(self, user):
        if self.expiration_date < timezone.now():
            raise ValidationError({"message": "This discount code has expired."})
        if user in self.used_by_users.all():
            raise ValidationError({"message": "You have already used this discount code."})
        if self.usage_limit is not None and self.usage_count() >= self.usage_limit:
            raise ValidationError({"message": "This discount code has reached its usage limit."})

    def calculate_discount(self, order_total):
        if self.discount_type == 'percentage':
            discount = (self.discount_value / 100) * order_total
        else:
            discount = self.discount_value
        return min(discount, self.max_discount_amount)
    
    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_discount_code()
        super().save(*args, **kwargs)
        
        