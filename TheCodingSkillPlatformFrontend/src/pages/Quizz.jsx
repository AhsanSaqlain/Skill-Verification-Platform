import React, { useState, useEffect, useMemo } from "react";
import {
  LogOut,
  Clock,
  CheckCircle,
  Circle,
  Brain,
  Zap,
  Trophy,
  User,
  ArrowLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks
import "./Quizz.css";

// Mock database questions - moved outside for access if needed, or keep inside fetch
const questionBankData = {
  javascript: [
    {
      id: 1,
      question:
        "What is the output of `console.log(typeof null)` in JavaScript?",
      options: ["null", "undefined", "object", "boolean"],
      difficulty: "medium",
    },
    {
      id: 2,
      question:
        "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What does the '===' operator do in JavaScript?",
      options: ["Assignment", "Loose equality", "Strict equality", "Not equal"],
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is a closure in JavaScript?",
      options: [
        "A way to close the browser",
        "A function that has access to outer scope variables",
        "A method to end a loop",
        "A type of error handling",
      ],
      difficulty: "hard",
    },
    {
      id: 5,
      question: "Which of these is NOT a JavaScript framework?",
      options: ["React", "Vue", "Angular", "Laravel"],
      difficulty: "easy",
    },
  ],
  python: [
    {
      id: 1,
      question: "What is the correct way to create a list in Python?",
      options: [
        "list = (1, 2, 3)",
        "list = [1, 2, 3]",
        "list = {1, 2, 3}",
        "list = <1, 2, 3>",
      ],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What does 'self' represent in a Python class?",
      options: [
        "The class itself",
        "The instance of the class",
        "A global variable",
        "A reserved keyword",
      ],
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What is the output of `print(2 ** 3)` in Python?",
      options: ["6", "8", "9", "23"],
      difficulty: "easy",
    },
    {
      id: 5,
      question: "Which of these is used for exception handling in Python?",
      options: ["try-catch", "try-except", "catch-except", "handle-error"],
      difficulty: "medium",
    },
  ],
  java: [
    {
      id: 1,
      question:
        "Which of these is the correct way to declare a variable in Java?",
      options: ["int x = 5;", "x = 5;", "var x = 5;", "declare int x = 5;"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is the main method signature in Java?",
      options: [
        "public static void main(String args[])",
        "public void main(String args[])",
        "static void main(String args[])",
        "main(String args[])",
      ],
      difficulty: "medium",
    },
    {
      id: 3,
      question: "Which keyword is used for inheritance in Java?",
      options: ["inherits", "extends", "implements", "super"],
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is polymorphism in Java?",
      options: [
        "Having multiple constructors",
        "Using multiple inheritance",
        "One interface, multiple implementations",
        "Creating multiple objects",
      ],
      difficulty: "hard",
    },
    {
      id: 5,
      question: "Which collection allows duplicate elements in Java?",
      options: ["Set", "HashSet", "ArrayList", "TreeSet"],
      difficulty: "medium",
    },
  ],
  // Add other languages from your select options here for validation
  cpp: [
    {
      id: 1,
      question: "Which of the following is used for single-line comments in C++?",
      options: ["//", "/* */", "#", "--"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is the correct way to declare a pointer in C++?",
      options: ["int ptr = &var;", "int *ptr = &var;", "int &ptr = var;", "ptr = &var;"],
      difficulty: "medium",
    },
    {
      id: 3,
      question: "Which C++ keyword is used to define a class?",
      options: ["struct", "class", "object", "type"],
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What does the 'new' operator do in C++?",
      options: [
        "Creates a new variable", 
        "Dynamically allocates memory", 
        "Creates a new class", 
        "Initializes a variable to zero"
      ],
      difficulty: "medium",
    },
    {
      id: 5,
      question: "What is a virtual function in C++?",
      options: [
        "A function that doesn't exist", 
        "A function that can be overridden in derived classes", 
        "A function with no parameters", 
        "A function that returns void"
      ],
      difficulty: "hard",
    },
  ],
  csharp: [
    {
      id: 1,
      question: "What is the file extension for C# source files?",
      options: [".cs", ".c", ".csharp", ".cpp"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which keyword is used to define a property in C#?",
      options: ["get", "property", "prop", "set"],
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What does LINQ stand for in C#?",
      options: [
        "Language Integrated Network Query", 
        "Language Integrated Normal Query", 
        "Language Integrated Native Query", 
        "Language Integrated New Query"
      ],
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Which collection in C# allows you to store key-value pairs?",
      options: ["List", "Array", "Dictionary", "Queue"],
      difficulty: "easy",
    },
    {
      id: 5,
      question: "What is the purpose of the 'using' statement in C#?",
      options: [
        "To import namespaces", 
        "To ensure proper disposal of resources", 
        "To create a new instance", 
        "To define a new class"
      ],
      difficulty: "medium",
    },
  ],
  php: [
    {
      id: 1,
      question: "What is the correct way to start a PHP block of code?",
      options: ["<?php", "<php", "<script php>", "<?"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which superglobal variable in PHP is used to collect form data?",
      options: ["$_GET", "$_POST", "$_REQUEST", "$_FORM"],
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What does PHP stand for?",
      options: [
        "Personal Home Page", 
        "PHP: Hypertext Preprocessor", 
        "Preprocessed Hypertext Page", 
        "Program Hypertext Processor"
      ],
      difficulty: "easy",
    },
    {
      id: 4,
      question: "Which function is used to connect to a MySQL database in PHP?",
      options: ["mysql_connect()", "mysqli_connect()", "db_connect()", "connect_mysql()"],
      difficulty: "medium",
    },
    {
      id: 5,
      question: "How do you create a session variable in PHP?",
      options: [
        "$_SESSION['var'] = value;", 
        "session('var') = value;", 
        "$session->var = value;", 
        "Session.Add('var', value);"
      ],
      difficulty: "medium",
    },
  ],
  ruby: [
    {
      id: 1,
      question: "What symbol is used for comments in Ruby?",
      options: ["//", "#", "/* */", "--"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which of the following is NOT a valid way to create a string in Ruby?",
      options: ["'Hello'", "\"Hello\"", "%{Hello}", "@Hello@"],
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What does the '<<' operator do when used with strings in Ruby?",
      options: [
        "Shifts bits to the left", 
        "Appends to the string", 
        "Compares strings", 
        "Creates a substring"
      ],
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What is a Ruby gem?",
      options: [
        "A precious stone", 
        "A package or library", 
        "A variable type", 
        "A debugging tool"
      ],
      difficulty: "easy",
    },
    {
      id: 5,
      question: "Which method is called when a new object is created in Ruby?",
      options: ["new()", "create()", "initialize()", "constructor()"],
      difficulty: "medium",
    },
  ],
  go: [
    {
      id: 1,
      question: "What is the file extension for Go source files?",
      options: [".go", ".golang", ".g", ".gol"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which keyword is used to declare a variable in Go?",
      options: ["var", "let", "dim", "variable"],
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What is a goroutine in Go?",
      options: [
        "A type of variable", 
        "A lightweight thread managed by the Go runtime", 
        "A function that returns an error", 
        "A package management system"
      ],
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Which of the following is the correct way to handle errors in Go?",
      options: [
        "try-catch blocks", 
        "Returning error values and checking them", 
        "Using exceptions", 
        "Using the @error decorator"
      ],
      difficulty: "medium",
    },
    {
      id: 5,
      question: "What does the 'defer' keyword do in Go?",
      options: [
        "Delays the execution of a function until the surrounding function returns", 
        "Skips the execution of a function", 
        "Defines a deferred variable", 
        "Creates an asynchronous function"
      ],
      difficulty: "hard",
    },
  ],
  swift: [
    {
      id: 1,
      question: "What is the correct way to declare a constant in Swift?",
      options: ["let x = 10", "const x = 10", "var x = 10", "constant x = 10"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which of the following is an optional type in Swift?",
      options: ["Int", "String", "Bool", "Int?"],
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What is the purpose of 'guard' statement in Swift?",
      options: [
        "To protect variables from being modified", 
        "To handle errors", 
        "To exit scope early if conditions are not met", 
        "To create a protected function"
      ],
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What does ARC stand for in Swift?",
      options: [
        "Automatic Reference Counting", 
        "Automatic Retain Count", 
        "Advanced Runtime Compiler", 
        "Apple Runtime Controller"
      ],
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Which keyword is used to define a protocol in Swift?",
      options: ["protocol", "interface", "abstract", "contract"],
      difficulty: "easy",
    },
  ],
  kotlin: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in Kotlin that cannot be reassigned?",
      options: ["val x = 10", "var x = 10", "const x = 10", "let x = 10"],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which of the following is used to handle null safety in Kotlin?",
      options: ["??", "!!", "?.", "All of the above"],
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What is a coroutine in Kotlin?",
      options: [
        "A UI component", 
        "A database operation", 
        "A way to write asynchronous code sequentially", 
        "A type of variable"
      ],
      difficulty: "hard",
    },
    {
      id: 4,
      question: "Which function is automatically called when an object is created in Kotlin?",
      options: ["init()", "constructor()", "onCreate()", "new()"],
      difficulty: "medium",
    },
    {
      id: 5,
      question: "What is the Kotlin file extension?",
      options: [".kt", ".kotlin", ".ktl", ".ktn"],
      difficulty: "easy",
    },
  ],
  typescript: [
    {
      id: 1,
      question: "What is TypeScript?",
      options: [
        "A new programming language", 
        "A superset of JavaScript with static typing", 
        "A JavaScript framework", 
        "A JavaScript compiler"
      ],
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which symbol is used to define a type annotation in TypeScript?",
      options: [":", "=", "::", "->"],
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What is an interface in TypeScript?",
      options: [
        "A class that cannot be instantiated", 
        "A contract that defines the structure of an object", 
        "A function that returns a promise", 
        "A module system"
      ],
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What does the 'any' type represent in TypeScript?",
      options: [
        "A type that can only hold numbers", 
        "A type that can hold any value", 
        "A type that represents null or undefined", 
        "A type that can only hold strings"
      ],
      difficulty: "easy",
    },
    {
      id: 5,
      question: "Which TypeScript feature allows you to combine multiple types?",
      options: ["Interfaces", "Union types", "Generics", "Enums"],
      difficulty: "medium",
    },
  ],
  rust: [
    {
      id: 1,
      question: "What is the ownership system in Rust designed to prevent?",
      options: [
        "Memory leaks", 
        "Race conditions", 
        "Memory safety issues like null pointer dereferences", 
        "All of the above"
      ],
      difficulty: "medium",
    },
    {
      id: 2,
      question: "Which keyword is used to declare a variable in Rust?",
      options: ["let", "var", "const", "def"],
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What is a 'trait' in Rust?",
      options: [
        "A type of variable", 
        "A way to define shared behavior across types", 
        "A memory management technique", 
        "A type of loop"
      ],
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What symbol is used to indicate a reference in Rust?",
      options: ["*", "&", "^", "@"],
      difficulty: "easy",
    },
    {
      id: 5,
      question: "What is the purpose of the 'Option' enum in Rust?",
      options: [
        "To represent optional configuration settings", 
        "To handle errors", 
        "To represent a value that might be absent", 
        "To create optional function parameters"
      ],
      difficulty: "medium",
    },
  ],
};

const validLanguages = Object.keys(questionBankData);

export default function Quizz() {
  const { languageUrlParam } = useParams(); // Get language from URL
  const navigate = useNavigate(); // For changing URL

  const [selectedLanguage, setSelectedLanguage] = useState(
    languageUrlParam && validLanguages.includes(languageUrlParam)
      ? languageUrlParam
      : "javascript"
  );
  const [answers, setAnswers] = useState({});
  const [codeAnswer, setCodeAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to update selectedLanguage if URL parameter changes and is valid
  useEffect(() => {
    if (languageUrlParam && validLanguages.includes(languageUrlParam)) {
      setSelectedLanguage(languageUrlParam);
    } else if (languageUrlParam) {
      // If language in URL is invalid, navigate to a default (e.g., JavaScript)
      // or show an error page. Here, we navigate to JS quiz.
      navigate("/quiz/javascript", { replace: true });
    }
    // If no languageUrlParam (e.g. base /quiz route), it might default based on initial state
    // or you can redirect as well:
    // else if (!languageUrlParam && window.location.pathname.startsWith('/quiz')) {
    //   navigate('/quiz/javascript', { replace: true });
    // }
  }, [languageUrlParam, navigate]);

  const fetchQuestionsFromDatabase = async (language) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Use the more globally defined questionBankData or ensure it's up-to-date
    const questionBank = questionBankData;
    const selectedQuestions = questionBank[language] || questionBank.javascript; // Fallback
    setQuestions(
      selectedQuestions.length > 0 ? selectedQuestions : questionBank.javascript
    );
    setAnswers({});
    setCodeAnswer("");
    setLoading(false);
  };

  // Effect to fetch questions when selectedLanguage changes
  useEffect(() => {
    if (selectedLanguage) {
      fetchQuestionsFromDatabase(selectedLanguage);
    }
  }, [selectedLanguage]);

  const handleLanguageDropdownChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    navigate(`/quiz/${newLanguage}`); // Update URL when dropdown changes
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (questions.length === 0) {
      alert("No questions loaded to submit.");
      return;
    }
    const results = {
      language: selectedLanguage,
      answers: answers,
      codeAnswer: codeAnswer,
      submittedAt: new Date().toISOString(),
      completionRate: (Object.keys(answers).length / questions.length) * 100,
    };
    console.log("Quiz Results:", results);
    alert(
      `Quiz submitted successfully! Completion: ${results.completionRate.toFixed(
        0
      )}%`
    );
  };



  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "difficulty-easy";
      case "medium":
        return "difficulty-medium";
      case "hard":
        return "difficulty-hard";
      default:
        return "difficulty-default";
    }
  };

  const getDifficultyIcon = (difficulty) => {
    const iconProps = { className: "difficulty-badge-icon" };
    switch (difficulty) {
      case "easy":
        return <Circle {...iconProps} />;
      case "medium":
        return <Zap {...iconProps} />;
      case "hard":
        return <Brain {...iconProps} />;
      default:
        return <Circle {...iconProps} />;
    }
  };



  const handleQuickNavClick = (index) => {
    const questionElement = document.getElementById(
      `question-${questions[index]?.id}`
    );
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Memoize options for select dropdown to avoid re-creating on every render
  const languageOptions = useMemo(
    () =>
      validLanguages
        .filter(
          (lang) => questionBankData[lang]?.length > 0 || lang === "javascript"
        ) // Ensure only languages with questions (or default) are shown
        .map((lang) => ({
          value: lang,
          label: lang.charAt(0).toUpperCase() + lang.slice(1),
        })),
    []
  );

  return (
    <div className="quiz-page-container">
      {/* Header */}
      <header className="quiz-header">
        <div className="header-content-wrapper">
          <div className="header-logo-container">
            <h1 className="header-logo-text">&lt;&gt;CodeCerd</h1>
          </div>
          <div className="header-info-actions">

            <div className="header-profile-logout">
              <div className="profile-avatar-container">
                <div className="profile-avatar-wrapper">
                  <div className="profile-avatar-inner">
                    <User className="profile-avatar-icon" />
                  </div>
                </div>
                <div className="profile-status-indicator"></div>
              </div>
              <button
                className="dashboard-button"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="dashboard-icon" />
                <span className="dashboard-text">Dashboard</span>
              </button>
              <button
                className="logout-button"
                onClick={() => navigate('/')}
              >
                <LogOut className="logout-icon" />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="quiz-main-content">
        <div className="main-layout-grid">
          {/* Sidebar */}
          <aside className="sidebar-container">
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">
                <span className="sidebar-title-icon-wrapper lang-icon-bg">
                  <span className="sidebar-title-icon-text">&lt;/&gt;</span>
                </span>
                Language
              </h3>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageDropdownChange(e.target.value)}
                className="language-select"
              >
                {languageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-card-title">
                <span className="sidebar-title-icon-wrapper progress-icon-bg">
                  <Trophy className="sidebar-title-lucide-icon" />
                </span>
                Progress
              </h3>
              <div className="progress-details">
                <div className="progress-completion-text">
                  <span>Completed</span>
                  <span>
                    {Object.keys(answers).length}/
                    {Math.max(questions.length, 1)}
                  </span>
                </div>
                <div className="progress-bar-wrapper">
                  <div
                    className="progress-bar-inner"
                    style={{
                      width: `${
                        (Object.keys(answers).length /
                          Math.max(questions.length, 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="progress-percentage-text">
                  <span>
                    {Math.round(
                      (Object.keys(answers).length /
                        Math.max(questions.length, 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-card-title">
                <span className="sidebar-title-icon-wrapper nav-icon-bg">
                  <span className="sidebar-title-icon-text small-q">Q</span>
                </span>
                Questions
              </h3>
              <div className="quick-nav-grid">
                {questions.map((q, index) => (
                  <button
                    key={q.id || index} // Use question id if available for more stable key
                    onClick={() => handleQuickNavClick(index)}
                    className={`quick-nav-button ${
                      answers[q?.id] ? "answered" : "unanswered"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Quiz Area */}
          <section className="quiz-area-main">
            {loading ? (
              <div className="loading-indicator-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">
                  Loading questions for {selectedLanguage}...
                </p>
              </div>
            ) : (
              <>
                <div className="questions-list-container">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      id={`question-${question.id}`}
                      className="question-card"
                    >
                      <div className="question-card-header">
                        <h3 className="question-text">
                          <span className="question-number-badge">
                            {index + 1}
                          </span>
                          {question.question}
                        </h3>
                        <div
                          className={`difficulty-badge ${getDifficultyClass(
                            question.difficulty
                          )}`}
                        >
                          {getDifficultyIcon(question.difficulty)}
                          <span className="difficulty-text">
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="options-grid-container">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = answers[question.id] === option;
                          return (
                            <label
                              key={optionIndex}
                              className={`option-label ${
                                isSelected ? "selected" : "unselected"
                              }`}
                            >
                              <div
                                className={`custom-radio-button ${
                                  isSelected ? "selected" : ""
                                }`}
                              >
                                {isSelected && (
                                  <CheckCircle className="custom-radio-checkmark" />
                                )}
                              </div>
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={isSelected}
                                onChange={() =>
                                  handleAnswerChange(question.id, option)
                                }
                                className="sr-only-input"
                              />
                              <span className="option-text">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="coding-challenge-card">
                  <div className="coding-challenge-header">
                    <h3 className="coding-challenge-title">
                      <span className="sidebar-title-icon-wrapper code-challenge-icon-bg">
                        <Brain className="sidebar-title-lucide-icon large-icon" />
                      </span>
                      Coding Challenge
                    </h3>
                    <div className="coding-language-tag">
                      {selectedLanguage.charAt(0).toUpperCase() +
                        selectedLanguage.slice(1)}
                    </div>
                  </div>
                  <div className="coding-problem-description">
                    <p>
                      <strong>Problem:</strong> Write a function that finds the
                      maximum number in an array. Your solution should handle
                      edge cases like empty arrays and should be efficient.
                    </p>
                  </div>
                  <div className="code-editor-wrapper">
                    <textarea
                      value={codeAnswer}
                      onChange={(e) => setCodeAnswer(e.target.value)}
                      placeholder={`// Write your ${selectedLanguage} code here...\n\nfunction findMax(arr) {\n    // Your implementation\n    // Handle edge cases\n    // Return the maximum value\n}`}
                      className="code-textarea"
                      style={{ tabSize: 4 }}
                    />
                  </div>
                </div>

                <div className="submit-button-container">
                  <button
                    onClick={handleSubmit}
                    className="submit-quiz-button"
                    disabled={loading || questions.length === 0}
                  >
                    Submit Quiz
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
