from rest_framework import serializers
from .models import Session


class SessionSerializer(serializers.ModelSerializer):
    creator_username = serializers.CharField(
        source="creator.username",
        read_only=True
    )

    class Meta:
        model = Session
        fields = [
            "id",
            "title",
            "description",
            "price",
            "duration",
            "creator",
            "creator_username",
            "created_at",
        ]
        read_only_fields = ["creator"]


class CreatorSessionSerializer(serializers.ModelSerializer):
    bookings_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Session
        fields = [
            "id",
            "title",
            "description",
            "price",
            "duration",
            "created_at",
            "bookings_count",
        ]