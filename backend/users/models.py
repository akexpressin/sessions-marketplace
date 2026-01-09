from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ("USER", "User"),
        ("CREATOR", "Creator"),
    )

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default="USER"
    )
    avatar = models.URLField(blank=True, null=True)
