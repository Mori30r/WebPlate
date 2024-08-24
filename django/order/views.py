from rest_framework.pagination import PageNumberPagination

from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework import status
from rest_framework.response import Response

from order.serializers import CategorySerializer, DiscountCodeDetailSerializer, MealAvailabilitySerializer, MealSerializer, OrderSerializer
from order.models import Category, DiscountCode, Meal, Order


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
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

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
    

class DiscountCodeDetailView(APIView):
    
    def get_queryset(self):
        return DiscountCode.objects.all()

    def get(self, request, *args, **kwargs):
        code = request.query_params.get('code')
        if not code:
            return Response({"error": "Discount code is required."}, status=400)

        try:
            discount_code = DiscountCode.objects.get(code=code)
        except DiscountCode.DoesNotExist:
            raise NotFound({"error": "Discount code not found."})

        try:
            discount_code.is_valid(self.request.user)
        except ValidationError as e:
            return Response({"error": str(e)}, status=400)

        serializer = DiscountCodeDetailSerializer({
            'type': discount_code.discount_type,
            'value': discount_code.discount_value,
            'limit': discount_code.min_purchase_amount,
            'expiration_date': discount_code.expiration_date
        })
        
        return Response(serializer.data, status=200)