from django.contrib import admin

from order.models import  Category, DiscountCode, Ingredient, Meal, Order




@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'address', 'total_price', 'status', 'created_at')
    search_fields = ('user__username', 'address__name', 'status')
    list_filter = ('status',)



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','name',)
    search_fields = ('name',)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'rate', 'duration', 'calories', 'weight', 'price', 'category', 'quantity_available')
    search_fields = ('name', 'category__name')
    list_filter = ('category', 'rate')
    filter_horizontal = ('ingredients',)

@admin.register(DiscountCode)
class DiscountCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_type', 'discount_value', 'applicable_meal',
                    'applicable_category', 'min_purchase_amount', 'max_discount_amount', 'usage_limit', 'usage_count')
    fields = ('code', 'discount_type', 'discount_value', 'applicable_meal', 
              'applicable_category', 'min_purchase_amount', 'max_discount_amount', 
              'expiration_date', 'usage_limit', 'used_by_users')