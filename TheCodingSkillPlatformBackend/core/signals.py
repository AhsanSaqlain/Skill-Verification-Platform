from django.db.models.signals import post_save
from django.dispatch import receiver
from core.models import TestSeries, Test, Language, Question
from core.services.test_generator_gemini import generate_mcq_questions

@receiver(post_save, sender=TestSeries)
def create_tests_for_series(sender, instance, created, **kwargs):
    """
    Automatically creates 5 tests (3 MCQ + 2 Coding) for every new TestSeries.
    Also generates MCQ questions using Gemini API.
    """
    if created:
        print(f"[Signal Triggered] Creating tests for {instance}")

        # Ensure at least one language exists
        lang, _ = Language.objects.get_or_create(language_name="English")

        # Define test plan (3 MCQ + 2 coding)
        test_configs = [
            ('mcq', 'beginner'),
            ('mcq', 'intermediate'),
            ('mcq', 'expert'),
            ('coding', 'intermediate'),
            ('coding', 'expert'),
        ]

        for order, (test_type, level) in enumerate(test_configs, start=1):
            test = Test.objects.create(
                series=instance,
                language=lang,
                test_type=test_type,
                difficulty_level=level,
                order=order,
                title=f"{instance.skill.skill_name} {level.capitalize()} {test_type.upper()} Test"
            )
            print(f"✅ Created: {test}")

            # Only generate questions for MCQ tests
            if test_type == 'mcq':
                try:
                    questions = generate_mcq_questions(instance.skill.skill_name, level, 3)
                    for q in questions:
                        Question.objects.create(
                            test=test,
                            question_text=q.get("question", ""),
                            options=q.get("options", []),
                            correct_answer=q.get("answer", ""),
                            question_type='mcq'
                        )
                    print(f"✅ Added {len(questions)} questions to {test.title}")
                except Exception as e:
                    print(f"❌ Error generating questions for {test.title}: {e}")
