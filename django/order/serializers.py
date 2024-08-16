from rest_framework import serializers
from django.db.models import F
from django.db import transaction
from order.models import Meal, Order, OrderItem

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = [
            'id', 
            'name', 
            'rate', 
            'duration', 
            'calories', 
            'weight', 
            'price', 
            'image', 
            'category', 
            'quantity_available'
        ]
        
class MealAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'name', 'quantity_available']   



class OrderItemSerializer(serializers.ModelSerializer):
    meal = serializers.PrimaryKeyRelatedField(queryset=Meal.objects.all())
    meal_name = serializers.CharField(source='meal.name', read_only=True)
    meal_image = serializers.ImageField(source='meal.image', read_only=True)
    price = serializers.DecimalField(source='meal.price', max_digits=10, decimal_places=2, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['meal', 'meal_name', 'quantity', 'price', 'meal_image', 'total']

    def get_total(self, obj):
        return obj.meal.price * obj.quantity
    
class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'address', 'order_items', 'total_price', 'status', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('order_items')
        
        if not items_data:
            raise serializers.ValidationError({"order_items": "This field is required."})

        with transaction.atomic():
            order = Order.objects.create(**validated_data)
            order.add_items(items_data)

        return order