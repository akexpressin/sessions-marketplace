from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
from bookings.models import Booking
from bookings.serializers import BookingSerializer
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user

    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    user = request.user
    bookings = Booking.objects.filter(user=user)

    return Response({
        "profile": {
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "avatar": user.avatar,
        },
        "bookings": BookingSerializer(bookings, many=True).data
    })


@api_view(["POST"])
def google_login(request):
    token = request.data.get("token")

    if not token:
        return Response({"detail": "Token required"}, status=400)

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )
    except ValueError:
        return Response({"detail": "Invalid Google token"}, status=400)

    email = idinfo.get("email")
    name = idinfo.get("name")

    user, created = User.objects.get_or_create(
        username=email,
        defaults={
            "email": email,
            "first_name": name,
        }
    )

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
    })
