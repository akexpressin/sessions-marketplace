from django.urls import path
from .views import session_list, create_session, creator_dashboard

urlpatterns = [
    path("", session_list),
    path("create/", create_session),
    path("creator/dashboard/", creator_dashboard),
]
