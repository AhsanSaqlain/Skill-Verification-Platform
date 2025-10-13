from django.contrib import admin
from .models import User, AdminUser, Skill, Language, Test, Question, Submission, Report, FaceVerificationLog

admin.site.register(User)
admin.site.register(AdminUser)
admin.site.register(Skill)
admin.site.register(Language)
admin.site.register(Test)
admin.site.register(Question)
admin.site.register(Submission)
admin.site.register(Report)
admin.site.register(FaceVerificationLog)

