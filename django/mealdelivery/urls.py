from django.contrib import admin
from django.urls import path, include


from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('meal-admin/', admin.site.urls),
    path("api/", include('profile.urls')),
    path("api/order/", include('order.urls')),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
