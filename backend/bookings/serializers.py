from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    session_title = serializers.CharField(source="session.title", read_only=True)
    session_description = serializers.CharField(source="session.description", read_only=True)
    price = serializers.DecimalField(source="session.price", max_digits=10, decimal_places=2, read_only=True)
    duration = serializers.IntegerField(source="session.duration", read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "booked_at",
            "session",
            "session_title",
            "session_description",
            "price",
            "duration",
        ]
