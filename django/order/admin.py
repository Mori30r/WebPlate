from django.contrib import admin

from order.models import  Category, Ingredient, Meal, Order




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