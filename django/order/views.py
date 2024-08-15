from rest_framework.pagination import PageNumberPagination

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from order.serializers import MealSerializer
from order.models import Meal


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