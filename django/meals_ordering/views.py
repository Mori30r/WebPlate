import logging

from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from meals_ordering.models import Address
from meals_ordering.serializers import UserSerializer, RegisterSerializer, LoginSerializer, ProfileUpdateSerializer,\
    AddressSerializer, AddressCreateSerializer, AddressUpdateSerializer


logger = logging.getLogger(__name__)

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='register', permission_classes=[AllowAny])
    def register(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data)

    @action(detail=False, methods=['post'], url_path='login', permission_classes=[AllowAny])
    def login(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })

    @action(detail=False, methods=["GET", "PATCH"], url_path='profile', permission_classes=[IsAuthenticated])
    def profile(self, request, *args, **kwargs):
        user = request.user
        profile = getattr(user, 'profile', None)

        if not profile:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            return Response(ProfileUpdateSerializer(profile).data)

        serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get', 'post', 'patch'], url_path='address', permission_classes=[IsAuthenticated])
    def address(self, request, *args, **kwargs):
        user = request.user

        if request.method == 'GET':
            addresses = Address.objects.filter(user=user)
            serializer = AddressSerializer(addresses, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            serializer = AddressCreateSerializer(data=request.data)
            if serializer.is_valid():
                address = serializer.save(user=user)
                return Response(AddressSerializer(address).data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'PATCH':
            address_id = request.data.get('id')
            try:
                address = Address.objects.get(id=address_id, user=user)
            except Address.DoesNotExist:
                return Response({"error": "Address not found"}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = AddressUpdateSerializer(address, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(AddressSerializer(address).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)