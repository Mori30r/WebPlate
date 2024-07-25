from .models import Profile, Address
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate



class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'name', 'detail', 'latitude', 'longitude']
        read_only_fields = ['id']


class AddressCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['name', 'detail', 'latitude', 'longitude']

class AddressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['name', 'detail', 'latitude', 'longitude']


class ProfileUpdateSerializer(serializers.ModelSerializer):
    addresses = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'image', 'phone_number', 'addresses']

    def get_addresses(self, obj):
        user = obj.user
        addresses = Address.objects.filter(user=user)
        return AddressSerializer(addresses, many=True).data

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileUpdateSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'profile']

class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(
                email=validated_data['email'],
                username=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
            Profile.objects.create(
                user=user,
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
        return user

    
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")