from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Session
from .serializers import SessionSerializer, CreatorSessionSerializer
from users.permissions import IsCreator
from django.db.models import Count


@api_view(["GET"])
@permission_classes([AllowAny])
def session_list(request):
    sessions = Session.objects.all().order_by("-created_at")
    serializer = SessionSerializer(sessions, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsCreator])
def create_session(request):
    serializer = SessionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(creator=request.user)
    return Response(serializer.data, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsCreator])
def creator_dashboard(request):
    sessions = (
        Session.objects
        .filter(creator=request.user)
        .annotate(bookings_count=Count("bookings"))
    )

    serializer = CreatorSessionSerializer(sessions, many=True)
    return Response(serializer.data)
