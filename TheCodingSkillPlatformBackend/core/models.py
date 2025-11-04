from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

    def get_by_natural_key(self, username):
        # Usually username field or email is used for authentication
        return self.get(email=username)
    
class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=255)
    dob = models.DateField(null=True, blank=True)
    qualification = models.CharField(max_length=255)
    education = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    passport_photo = models.ImageField(upload_to='passport_photos/')
    live_scan_photo = models.ImageField(upload_to='live_scan_photos/')
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'  # What user uses to login
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email


class AdminUser(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    pin_code = models.CharField(max_length=10)

    def __str__(self):
        return self.email


class Skill(models.Model):
    skill_name = models.CharField(max_length=100)
    skill_level = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.skill_name} - {self.skill_level}"


class Language(models.Model):
    language_name = models.CharField(max_length=100)

    def __str__(self):
        return self.language_name

class TestSeries(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="test_series")
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    years_of_experience = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.skill.skill_name} Series"
    

class Test(models.Model):
    TEST_TYPES = [
        ('mcq', 'MCQ'),
        ('coding', 'Coding'),
    ]

    series = models.ForeignKey(TestSeries, on_delete=models.CASCADE, related_name="tests", null=True, blank=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    test_type = models.CharField(max_length=20, choices=TEST_TYPES)
    difficulty_level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('expert', 'Expert'),
    ])
    order = models.PositiveIntegerField(help_text="Test position in series (1–5)")
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    title = models.CharField(max_length=255, default="")

    def __str__(self):
        return f"{self.series.skill.skill_name} - {self.test_type} ({self.difficulty_level})"



class Question(models.Model):
    QUESTION_TYPES = [
        ('mcq', 'MCQ'),
        ('code', 'Code'),
    ]

    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    question_text = models.TextField()
    options = models.JSONField(null=True, blank=True)  # for MCQs
    correct_answer = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)

    def __str__(self):
        return f"Q{self.id} - {self.question_type}"


class Submission(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_answer = models.TextField(null=True, blank=True)
    code_submission = models.TextField(null=True, blank=True)
    evaluation_score = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Submission {self.id}"


class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    confidence_score = models.FloatField()
    skill_level = models.CharField(max_length=50)
    feedback = models.TextField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report {self.id}"


class FaceVerificationLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    result = models.CharField(max_length=50)
    verified_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Verification {self.id}"

from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=TestSeries)
def create_default_tests(sender, instance, created, **kwargs):
    if created:
        # Define test plan: first 3 MCQs, last 2 Coding
        test_plan = [
            ("mcq", "beginner", 1),
            ("mcq", "intermediate", 2),
            ("mcq", "expert", 3),
            ("coding", "intermediate", 4),
            ("coding", "expert", 5),
        ]

        for test_type, difficulty, order in test_plan:
            instance.tests.create(
                language_id=1,  # You can later dynamically link correct language
                test_type=test_type,
                difficulty_level=difficulty,
                order=order,
                title=f"{instance.skill.skill_name} {difficulty.capitalize()} {test_type.upper()} Test"
            )


