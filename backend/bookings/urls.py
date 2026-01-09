from django.urls import path
from .views import book_session, my_bookings, creator_bookings

urlpatterns = [
    path("book/<int:session_id>/", book_session),
    path("my/", my_bookings),
    path("creator/", creator_bookings),
]
