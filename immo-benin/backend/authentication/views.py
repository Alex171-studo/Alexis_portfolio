# immobenin_backend/authentication/views.py

import firebase_admin
from firebase_admin import auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
import uuid
from rest_framework import permissions
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from .serializers import CustomUserSerializer # Assuming this serializer exists or will be created

User = get_user_model()

from rest_framework_simplejwt.tokens import RefreshToken

# ... (autres imports)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class FirebaseLoginView(APIView):
    permission_classes = [permissions.AllowAny] 

    def post(self, request):
        id_token = request.data.get('token')
        if not id_token:
            return Response({"error": "ID token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_token = auth.verify_id_token(id_token, clock_skew_seconds=60)
            uid = decoded_token['uid']
            email = decoded_token.get('email')

            if not email:
                return Response({"error": "Email not found in Firebase ID token"}, status=status.HTTP_400_BAD_REQUEST)

            username = request.data.get('username')
            phone_number = request.data.get('phone_number')

            user, created = User.objects.get_or_create(
                firebase_uid=uid,
                defaults={
                    'email': email,
                    'username': username if username else f"user_{uid[:8]}",
                    'phone_number': phone_number
                }
            )

            if not created:
                if username and not user.username:
                    user.username = username
                if phone_number and not user.phone_number:
                    user.phone_number = phone_number
                user.save()

            tokens = get_tokens_for_user(user)
            user_serializer = CustomUserSerializer(user)

            return Response({
                'access': tokens['access'],
                'refresh': tokens['refresh'],
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)

        except auth.ExpiredIdTokenError:
            return Response({"error": "Le token Firebase a expiré."}, status=status.HTTP_403_FORBIDDEN)
        except auth.InvalidIdTokenError as e:
            return Response({"error": f"Token Firebase invalide: {e}"}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({"error": f"Une erreur inattendue est survenue: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]


class MakeAdminView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.is_staff = True
        user.save()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


class RevokeAdminView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.is_staff = False
        user.save()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


class DeleteUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is not None and user.is_staff:
            tokens = get_tokens_for_user(user)
            user_serializer = CustomUserSerializer(user)
            
            return Response({
                'access': tokens['access'],
                'refresh': tokens['refresh'],
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials or not an admin"}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

