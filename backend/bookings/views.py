from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingSerializer
from sessions.models import Session
from users.permissions import IsCreator


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def book_session(request, session_id):
    session = Session.objects.get(id=session_id)

    # prevent duplicate booking
    if Booking.objects.filter(user=request.user, session=session).exists():
        return Response(
            {"detail": "Session already booked"},
            status=400
        )

    booking = Booking.objects.create(
        user=request.user,
        session=session
    )
    serializer = BookingSerializer(booking)
    return Response(serializer.data, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCreator])
def creator_bookings(request):
    bookings = Booking.objects.filter(
        session__creator=request.user
    )
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)
