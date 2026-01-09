from django.contrib import admin
from django.urls import path
from .views import protected_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/protected/", protected_view),
    path("api/users/", include("users.urls")),
    path("api/sessions/", include("sessions.urls")),
    path("api/bookings/", include("bookings.urls")),
]
