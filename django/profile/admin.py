from django.contrib import admin
from profile.models import Address, Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'phone_number')
    search_fields = ('user__username', 'first_name', 'last_name', 'phone_number')


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'detail', 'latitude', 'longitude')
    search_fields = ('user__username', 'name', 'detail')

