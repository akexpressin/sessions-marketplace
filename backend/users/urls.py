from django.urls import path
from .views import profile_view, user_dashboard, google_login

urlpatterns = [
    path("profile/", profile_view),
    path("dashboard/", user_dashboard),
    path("google-login/", google_login),
]
