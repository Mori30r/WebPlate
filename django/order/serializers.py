from rest_framework import serializers
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
    items = serializers.SerializerMethodField()
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'address', 'items', 'total_price', 'status', 'created_at']

    def get_items(self, obj):
        order_items = OrderItem.objects.filter(order=obj)
        return OrderItemSerializer(order_items, many=True).data

    def create(self, validated_data):
        items_data = self.initial_data.get('items')
        if not items_data:
            raise serializers.ValidationError({"items": "This field is required."})

        total_price = 0

        for item_data in items_data:
            meal = Meal.objects.get(id=item_data['meal'])
            quantity = item_data['quantity']
            if meal.quantity_available < quantity:
                raise serializers.ValidationError({"message": f"Not enough quantity available for {meal.name}"})
            total_price += meal.price * quantity

        order = Order.objects.create(total_price=total_price, **validated_data)

        for item_data in items_data:
            meal = Meal.objects.get(id=item_data['meal'])
            meal.quantity_available -= quantity
            meal.save(update_fields=["quantity_available"])
            OrderItem.objects.create(order=order, meal=meal, quantity=item_data['quantity'])

        return order