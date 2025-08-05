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

class FirebaseLoginView(APIView):
    permission_classes = [permissions.AllowAny] 

    def post(self, request):
        id_token = request.data.get('idToken')
        if not id_token:
            return Response({"error": "ID token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            email = decoded_token.get('email')

            if not email:
                return Response({"error": "Email not found in Firebase ID token"}, status=status.HTTP_400_BAD_REQUEST)

            # Utiliser get_or_create pour simplifier la logique
            user, created = User.objects.get_or_create(
                firebase_uid=uid,
                defaults={'email': email, 'username': f"firebase_{uid}"[:150]}
            )

            # Si l'utilisateur n'a pas été créé, s'assurer que l'email est à jour
            if not created and user.email != email:
                user.email = email
                user.save()

            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "firebase_uid": user.firebase_uid
            }, status=status.HTTP_200_OK)

        except auth.InvalidIdTokenError:
            return Response({"error": "Invalid Firebase ID token"}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "is_staff": user.is_staff
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials or not an admin"}, status=status.HTTP_401_UNAUTHORIZED)
