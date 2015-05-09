from django.contrib.auth import authenticate, logout, login
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView


class LoginView(APIView):
    """
    View for login to the system
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
        if user is not None:
            if user.is_active:
                login(request, user)
                return Response({"status": "Authorized", "user": {"username": user.username}})
            else:
                return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)