from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import viewsets
from .models import User, AdminUser, Skill, Language, Test, Question, Submission, Report, FaceVerificationLog, TestSeries
from .serializers import (
    UserSerializer, AdminUserSerializer, SkillSerializer,
    LanguageSerializer, TestSerializer, QuestionSerializer,
    SubmissionSerializer, ReportSerializer, FaceVerificationLogSerializer,
    TestSeriesSerializer, SubmissionDetailSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class FaceVerificationLogViewSet(viewsets.ModelViewSet):
    queryset = FaceVerificationLog.objects.all()
    serializer_class = FaceVerificationLogSerializer

@api_view(['POST'])
def signup(request):
    """
    Handle user registration (signup).
    """
    if request.method == 'POST':
        # Receive data from the request
        data = request.data
        # Create the serializer instance
        
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            # Save the user data in the database
            user = serializer.save()

            # Generate the refresh token and access token for the user
            # refresh = RefreshToken.for_user(user)

            # return Response({
                #   'user': serializer.data,  # You can return user data if needed
                    #'access_token': str(refresh.access_token),  # Access token
                    #'refresh_token': str(refresh),  # Refresh token (optional)
            # }, status=status.HTTP_201_CREATED)

            return Response({
                'message': 'User Registered Successfully !!',
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return error response
    

@api_view(['POST'])
def login(request):
    """
    Authenticate user and return JWT token.
    """
    email = request.data.get("email")
    password = request.data.get("password")
    print(request.data)
    
    user = authenticate(request, username=email, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        })
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def get_user_data(request):
    """
    Returns the data of the currently authenticated user.
    """
    # access_token = request.headers.get('access_token')
    user = request.user  # The user is automatically attached to the request if authenticated
    return Response({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'phone': user.phone,
        'dob': user.dob,
        'qualification': user.qualification,
        'education': user.education,
        'gender': user.gender,
        'passport_photo': user.passport_photo.url if user.passport_photo else None,
        'live_scan_photo': user.live_scan_photo.url if user.live_scan_photo else None,
    })

# ============================
# 🚀 TestSeries & Test APIs
# ============================

from rest_framework.decorators import action

class TestSeriesViewSet(viewsets.ModelViewSet):
    """
    Handles creation & retrieval of TestSeries.
    When created, it automatically triggers signals to generate tests & questions.
    """
    queryset = TestSeries.objects.all().select_related('user', 'skill')
    serializer_class = TestSeriesSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically attach the logged-in user
        serializer.save(user=self.request.user)

    # Optional: allow filtering by user
    def get_queryset(self):
        user = self.request.user
        return TestSeries.objects.filter(user=user)


class TestListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Returns all tests for a given test series.
    """
    serializer_class = TestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        series_id = self.request.query_params.get('series_id')
        if series_id:
            return Test.objects.filter(series_id=series_id)
        return Test.objects.none()


class QuestionListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Returns all questions for a given test.
    """
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        test_id = self.request.query_params.get('test_id')
        if test_id:
            return Question.objects.filter(test_id=test_id)
        return Question.objects.none()


# ============================
# 🧠 Submission API
# ============================

class SubmissionDetailViewSet(viewsets.ModelViewSet):
    """
    Handles user submissions (for both MCQ and coding).
    """
    queryset = Submission.objects.all()
    serializer_class = SubmissionDetailSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
