from rest_framework import serializers
from order.models import Meal

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