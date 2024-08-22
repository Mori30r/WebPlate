from django.urls import path, include
from rest_framework.routers import DefaultRouter
from order import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'meals', views.MealViewSet)
router.register(r'order', views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
