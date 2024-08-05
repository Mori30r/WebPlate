from django.contrib import admin
from .models import Profile, Category, Ingredient, Meal, Address, Cart, MealItem, Order


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'phone_number')
    search_fields = ('user__username', 'first_name', 'last_name', 'phone_number')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('name', 'rate', 'duration', 'calories', 'weight', 'price', 'category', 'quantity_available')
    search_fields = ('name', 'category__name')
    list_filter = ('category', 'rate')
    filter_horizontal = ('ingredients',)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'detail', 'latitude', 'longitude')
    search_fields = ('user__username', 'name', 'detail')


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    search_fields = ('user__username',)


@admin.register(MealItem)
class MealItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'meal', 'quantity')
    search_fields = ('cart__user__username', 'meal__name')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'address', 'total_price', 'status', 'created_at')
    search_fields = ('user__username', 'address__name', 'status')
    list_filter = ('status',)
    filter_horizontal = ('meals',)