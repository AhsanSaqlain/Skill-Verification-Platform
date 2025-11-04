import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def generate_mcq_questions(skill_name, difficulty, num_questions=5):
    """
    Generates MCQ questions using Gemini API for a given skill and difficulty.
    Returns a list of dictionaries with question data.
    """
    model = genai.GenerativeModel("models/gemini-2.5-flash")

    prompt = f"""
    Generate {num_questions} multiple-choice questions about {skill_name}.
    The difficulty level should be {difficulty}.
    Each question should have:
    - One correct answer
    - Three incorrect options
    - A short explanation for the correct answer
    Format the response as a JSON list like this:
    [
      {{
        "question": "...",
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": "..."
      }},
      ...
    ]
    Return only valid JSON.
    """

    try:
        response = model.generate_content(prompt)
        text = response.candidates[0].content.parts[0].text.strip()

        # Clean JSON if wrapped in code fences
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].strip()

        questions = json.loads(text)
        if isinstance(questions, list):
            return questions
        else:
            print("⚠️ Gemini returned non-list JSON structure:", type(questions))
            return []
    except json.JSONDecodeError as e:
        print("⚠️ JSON decoding failed:", e)
        return []
    except Exception as e:
        print("⚠️ Error while calling Gemini API:", e)
        return []
