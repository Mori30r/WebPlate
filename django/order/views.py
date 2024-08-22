from rest_framework.pagination import PageNumberPagination

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response

from order.serializers import CategorySerializer, MealAvailabilitySerializer, MealSerializer, OrderSerializer
from order.models import Category, Meal, Order


class MealViewSet(ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    pagination_class = PageNumberPagination
    http_method_names = ['get']

    @action(detail=False, methods=['get'], url_path='by-category/(?P<category_id>\d+)')
    def by_category(self, request, category_id=None):
        meals = Meal.objects.filter(category_id=category_id)
        
        page = self.paginate_queryset(meals)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(meals, many=True)
        return Response(serializer.data)
    

class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='create-order')
    def create_order(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'], url_path='meal-availability')
    def meal_availability(self, request, pk=None):
        meal = get_object_or_404(Meal, pk=pk)
        serializer = MealAvailabilitySerializer(meal)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']