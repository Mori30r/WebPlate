from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.db import transaction
from order.models import Category, DiscountCode, Ingredient, Meal, Order, OrderItem



class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = [
            'id',
            'name',
            'emoji',
        ]

class MealSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(read_only=True, many=True)
    
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
            'quantity_available',
            'ingredients',
        ]
        
class MealAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'name', 'quantity_available']   



class OrderItemSerializer(serializers.ModelSerializer):
    meal = serializers.PrimaryKeyRelatedField(queryset=Meal.objects.all())
    meal_name = serializers.CharField(source='meal.name', read_only=True)
    meal_image = serializers.ImageField(source='meal.image', read_only=True)
    original_price = serializers.DecimalField(source='meal.price', max_digits=10, decimal_places=2, read_only=True)
    discount_percentage = serializers.DecimalField(source='meal.discount_percentage', max_digits=5, decimal_places=2, read_only=True)
    discounted_price = serializers.DecimalField(source='meal.discounted_price', max_digits=10, decimal_places=2, read_only=True)
    price = serializers.DecimalField(source='meal.get_final_price', max_digits=10, decimal_places=2, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['meal', 'meal_name', 'quantity', 'original_price', 'discount_percentage', 'discounted_price', 'price', 'meal_image', 'total']

    def get_total(self, obj):
        return obj.total_price
    
class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    discount_code = serializers.CharField(write_only=True, required=False, allow_blank=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    discount_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'address', 'order_items', 'total_price', 'discount_code', 'discount_amount', 'status', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('order_items')
        discount_code_str = validated_data.pop('discount_code', None)

        if not items_data:
            raise ValidationError({"order_items": "This field is required."})

        discount_code = None
        if discount_code_str:
            try:
                discount_code = DiscountCode.objects.get(code=discount_code_str)
                
                # Validate the discount code (usage limit and whether the user has used it)
                discount_code.is_valid(self.context['request'].user)
                
            except DiscountCode.DoesNotExist:
                raise ValidationError({"discount_code": "Invalid discount code."})

        with transaction.atomic():
            order = Order.objects.create(**validated_data, discount_code=discount_code)
            order.add_items(items_data)

        return order
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'emoji']
        
        
class DiscountCodeDetailSerializer(serializers.Serializer):
    type = serializers.ChoiceField(choices=[('percentage', 'Percentage'), ('amount', 'Amount')])
    value = serializers.DecimalField(max_digits=10, decimal_places=2)
    limit = serializers.DecimalField(max_digits=10, decimal_places=2)
    expiration_date = serializers.DateTimeField()