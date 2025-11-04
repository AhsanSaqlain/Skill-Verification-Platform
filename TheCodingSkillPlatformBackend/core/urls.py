from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, AdminUserViewSet, SkillViewSet, LanguageViewSet,
    TestViewSet, QuestionViewSet, SubmissionViewSet, ReportViewSet,
    FaceVerificationLogViewSet, TestSeriesViewSet, TestListViewSet,
    QuestionListViewSet, SubmissionDetailViewSet,
)
from . import views
from .views import signup, login, get_user_data

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'admins', AdminUserViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'languages', LanguageViewSet)
router.register(r'tests', TestViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'submissions', SubmissionViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'verifications', FaceVerificationLogViewSet)
router.register(r'test-series', TestSeriesViewSet, basename='test-series')
router.register(r'series-tests', TestListViewSet, basename='series-tests')
router.register(r'test-questions', QuestionListViewSet, basename='test-questions')
router.register(r'submit', SubmissionDetailViewSet, basename='submit')


urlpatterns = [
    path('', include(router.urls)),
    path('user/signup', views.signup, name='signup'),
    path('user/login', views.login, name='login'),
    path('user/me', views.get_user_data, name='get_user_data'),
]
