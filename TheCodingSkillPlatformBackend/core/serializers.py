from rest_framework import serializers
from .models import User, AdminUser, Skill, Language, Test, TestSeries, Question, Submission, Report, FaceVerificationLog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')  # Remove password from validated_data
        groups = validated_data.pop('groups', None)
        user_permissions = validated_data.pop('user_permissions', None)
        user = User(**validated_data)
        user.set_password(password)  # Hash password
        user.save()

        if groups is not None:
            user.groups.set(groups)
        if user_permissions is not None:
            user.user_permissions.set(user_permissions)

        return user
    
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class FaceVerificationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceVerificationLog
        fields = '__all__'

# ------------------------------
# NEW: Nested Serializers for TestSeries API
# ------------------------------

class QuestionDetailSerializer(serializers.ModelSerializer):
    """Used to show detailed question data inside a test"""
    class Meta:
        model = Question
        fields = '__all__'


class TestDetailSerializer(serializers.ModelSerializer):
    """Includes questions under each test"""
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Test
        fields = ['id', 'series', 'title', 'test_type', 'difficulty_level', 'order',
                  'start_time', 'end_time', 'language', 'questions']

    def get_questions(self, obj):
        qs = obj.question_set.all()
        return QuestionDetailSerializer(qs, many=True).data


class TestSeriesSerializer(serializers.ModelSerializer):
    """Main serializer for creating and viewing series"""
    tests = TestDetailSerializer(many=True, read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = TestSeries
        fields = ['id', 'user', 'user_email', 'skill', 'years_of_experience',
                  'created_at', 'is_completed', 'tests']


class SubmissionDetailSerializer(serializers.ModelSerializer):
    """Submission serializer for POSTing and viewing answers"""
    class Meta:
        model = Submission
        fields = ['id', 'test', 'question', 'user_answer', 'code_submission', 'evaluation_score']

