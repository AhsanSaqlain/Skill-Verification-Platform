import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { LogOut, ArrowLeft } from "lucide-react";
import "./AdminDashboard.css";

const placeholderUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    gender: "Male",
    picture: "https://api.dicebear.com/7.x/avatars/svg?seed=john",
    qualifications: "B.Tech in Computer Science",
    joinDate: "2025-05-01",
    testsCompleted: 15,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    gender: "Female",
    picture: "https://api.dicebear.com/7.x/avatars/svg?seed=jane",
    qualifications: "M.Sc in Software Engineering",
    joinDate: "2025-05-05",
    testsCompleted: 12,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    gender: "Male",
    picture: "https://api.dicebear.com/7.x/avatars/svg?seed=mike",
    qualifications: "BSc in Information Technology",
    joinDate: "2025-05-10",
    testsCompleted: 8,
  },
];

const placeholderTestResults = [
  {
    id: 1,
    studentName: "John Doe",
    testName: "JavaScript Basics",
    language: "javascript",
    score: 92,
    date: "2025-05-15",
    submittedAt: "2025-05-15T14:32:00Z",
    completionRate: 92,
    answers: {
      1: "object",
      2: "push()",
      3: "Strict equality",
      4: "A function that has access to outer scope variables",
      5: "Laravel"
    },
    codeAnswer: `function findMax(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  return max;
}`,
    questions: [
      {
        id: 1,
        question: "What is the output of `console.log(typeof null)` in JavaScript?",
        options: ["null", "undefined", "object", "boolean"],
        difficulty: "medium",
        correctAnswer: "object"
      },
      {
        id: 2,
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        difficulty: "easy",
        correctAnswer: "push()"
      },
      {
        id: 3,
        question: "What does the '===' operator do in JavaScript?",
        options: ["Assignment", "Loose equality", "Strict equality", "Not equal"],
        difficulty: "easy",
        correctAnswer: "Strict equality"
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
        correctAnswer: "A function that has access to outer scope variables"
      },
      {
        id: 5,
        question: "Which of these is NOT a JavaScript framework?",
        options: ["React", "Vue", "Angular", "Laravel"],
        difficulty: "easy",
        correctAnswer: "Laravel"
      }
    ]
  },
  {
    id: 2,
    studentName: "Jane Smith",
    testName: "Python Fundamentals",
    language: "python",
    score: 88,
    date: "2025-05-14",
    submittedAt: "2025-05-14T10:15:00Z",
    completionRate: 88,
    answers: {
      1: "list = [1, 2, 3]",
      2: "def",
      3: "The instance of the class",
      4: "8",
      5: "try-except"
    },
    codeAnswer: `def find_max(arr):
    if not arr:
        return None
    
    max_val = arr[0]
    for item in arr[1:]:
        if item > max_val:
            max_val = item
    
    return max_val`,
    questions: [
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
        correctAnswer: "list = [1, 2, 3]"
      },
      {
        id: 2,
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        difficulty: "easy",
        correctAnswer: "def"
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
        correctAnswer: "The instance of the class"
      },
      {
        id: 4,
        question: "What is the output of `print(2 ** 3)` in Python?",
        options: ["6", "8", "9", "23"],
        difficulty: "easy",
        correctAnswer: "8"
      },
      {
        id: 5,
        question: "Which of these is used for exception handling in Python?",
        options: ["try-catch", "try-except", "catch-except", "handle-error"],
        difficulty: "medium",
        correctAnswer: "try-except"
      }
    ]
  },
  {
    id: 3,
    studentName: "Mike Johnson",
    testName: "TypeScript Basics",
    language: "typescript",
    score: 95,
    date: "2025-05-13",
    submittedAt: "2025-05-13T16:45:00Z",
    completionRate: 95,
    answers: {
      1: "A superset of JavaScript with static typing",
      2: ":",
      3: "A contract that defines the structure of an object",
      4: "A type that can hold any value",
      5: "Union types"
    },
    codeAnswer: `function findMax<T extends number>(arr: T[]): T | null {
  if (!arr || arr.length === 0) {
    return null;
  }
  
  let max: T = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  return max;
}`,
    questions: [
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
        correctAnswer: "A superset of JavaScript with static typing"
      },
      {
        id: 2,
        question: "Which symbol is used to define a type annotation in TypeScript?",
        options: [":", "=", "::", "->"],
        difficulty: "easy",
        correctAnswer: ":"
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
        correctAnswer: "A contract that defines the structure of an object"
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
        correctAnswer: "A type that can hold any value"
      },
      {
        id: 5,
        question: "Which TypeScript feature allows you to combine multiple types?",
        options: ["Interfaces", "Union types", "Generics", "Enums"],
        difficulty: "medium",
        correctAnswer: "Union types"
      }
    ]
  },
];

const placeholderPendingTests = [
  {
    id: 1,
    studentName: "John Doe",
    testName: "Node.js Basics",
    dueDate: "2025-05-20",
  },
  {
    id: 2,
    studentName: "Jane Smith",
    testName: "TypeScript Intro",
    dueDate: "2025-05-21",
  },
  {
    id: 3,
    studentName: "Mike Johnson",
    testName: "Python Fundamentals",
    dueDate: "2025-05-22",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!sidebarCollapsed && <h2>Admin Panel</h2>}
          <button 
            className="sidebar-toggle" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toggle-icon">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toggle-icon">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            )}
          </button>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <ChartBarIcon className="nav-icon" />
            <span>Overview</span>
          </button>
          <button
            className={`nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <UserGroupIcon className="nav-icon" />
            <span>Users</span>
          </button>
          <button
            className={`nav-item ${activeTab === "results" ? "active" : ""}`}
            onClick={() => setActiveTab("results")}
          >
            <ClipboardDocumentCheckIcon className="nav-icon" />
            <span>Test Results</span>
          </button>
          <button
            className={`nav-item ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            <ClockIcon className="nav-icon" />
            <span>Pending Tests</span>
          </button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>{" "}
          <div className="header-actions">
            <button
              className="logout-button"
              onClick={() => navigate('/')}
            >
              <LogOut className="logout-icon" />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {activeTab === "overview" && (
            <div className="overview-section">
              <h2>Dashboard Overview</h2>

              {/* Recent Users Section */}
              <div className="overview-users-section">
                <div className="section-header-with-action">
                  <h3><UserGroupIcon className="section-icon" /> Recent Users</h3>
                  <button className="view-all-btn" onClick={() => setActiveTab("users")}>View All Users</button>
                </div>
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Academic Background</th>
                        <th>Assessments Done</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placeholderUsers.slice(0, 3).map((user) => (
                        <tr key={user.id}>
                          <td>
                            <img
                              src={user.picture}
                              alt={user.name}
                              className="user-avatar"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                            />
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.qualifications}</td>
                          <td>{user.testsCompleted}</td>
                          <td>
                            <button className="action-btn">View</button>
                            <button className="action-btn">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Test Results Section */}
              <div className="overview-results-section">
                <div className="section-header-with-action">
                  <h3><ClipboardDocumentCheckIcon className="section-icon" /> Recent Test Results</h3>
                  <button className="view-all-btn" onClick={() => setActiveTab("results")}>View All Results</button>
                </div>
                <div className="results-grid overview-grid">
                  {placeholderTestResults.map((result) => (
                    <div key={result.id} className="result-card">
                      <div className="result-header">
                        <h3>{result.testName}</h3>
                        <span
                          className={`score ${
                            result.score >= 90
                              ? "excellent"
                              : result.score >= 75
                              ? "good"
                              : "average"
                          }`}
                        >
                          {result.score}%
                        </span>
                      </div>
                      <div className="result-details">
                        <p>Student: {result.studentName}</p>
                        <p>Date: {result.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Tests Section */}
              <div className="overview-pending-section">
                <div className="section-header-with-action">
                  <h3><ClockIcon className="section-icon" /> Pending Tests</h3>
                  <button className="view-all-btn" onClick={() => setActiveTab("pending")}>View All Pending</button>
                </div>
                <div className="pending-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Test</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placeholderPendingTests.slice(0, 3).map((test) => (
                        <tr key={test.id}>
                          <td>{test.studentName}</td>
                          <td>{test.testName}</td>
                          <td>{test.dueDate}</td>
                          <td>
                            <span className="status pending">Pending</span>
                          </td>
                          <td>
                            <button className="action-btn">Remind</button>
                            <button className="action-btn">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="users-section">
              <h2>Registered Users</h2>
              <div className="users-table">
                <table>
                  {" "}
                  <thead>
                    <tr>
                      <th>Profile</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Gender Identity</th>
                      <th>Academic Background</th>
                      <th>Enrollment Date</th>
                      <th>Assessments Done</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placeholderUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <img
                            src={user.picture}
                            alt={user.name}
                            className="user-avatar"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.qualifications}</td>
                        <td>{user.joinDate}</td>
                        <td>{user.testsCompleted}</td>
                        <td>
                          <button className="action-btn">View</button>
                          <button className="action-btn">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="results-section">
              <h2>Test Results</h2>
              <div className="results-detailed-view">
                {placeholderTestResults.map((result) => (
                  <div key={result.id} className="detailed-result-card">
                    <div className="result-header">
                      <div className="result-header-main">
                        <h3>{result.testName}</h3>
                        <span
                          className={`score ${
                            result.score >= 90
                              ? "excellent"
                              : result.score >= 75
                              ? "good"
                              : "average"
                          }`}
                        >
                          {result.score}%
                        </span>
                      </div>
                      <div className="result-meta">
                        <p><strong>Student:</strong> {result.studentName}</p>
                        <p><strong>Language:</strong> {result.language.charAt(0).toUpperCase() + result.language.slice(1)}</p>
                        <p><strong>Date:</strong> {result.date}</p>
                        <p><strong>Submitted:</strong> {new Date(result.submittedAt).toLocaleString()}</p>
                        <p><strong>Completion Rate:</strong> {result.completionRate}%</p>
                      </div>
                    </div>
                    
                    <div className="result-questions-section">
                      <h4>Multiple Choice Questions</h4>
                      <div className="questions-answers-list">
                        {result.questions.map((question, index) => {
                          const studentAnswer = result.answers[question.id];
                          const isCorrect = studentAnswer === question.correctAnswer;
                          
                          return (
                            <div key={question.id} className="question-answer-item">
                              <div className="question-text">
                                <span className="question-number">{index + 1}.</span>
                                <span>{question.question}</span>
                                <span className={`difficulty-badge ${question.difficulty}`}>
                                  {question.difficulty}
                                </span>
                              </div>
                              
                              <div className="answer-section">
                                <div className="correct-answer">
                                  <strong>Correct Answer:</strong> {question.correctAnswer}
                                </div>
                                
                                <div className={`student-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                                  <strong>Student's Answer:</strong> {studentAnswer || 'Not answered'}
                                  {isCorrect ? 
                                    <span className="answer-status correct">✓ Correct</span> : 
                                    <span className="answer-status incorrect">✗ Incorrect</span>
                                  }
                                </div>
                              </div>
                              
                              <div className="options-list">
                                <strong>Options:</strong>
                                <ul>
                                  {question.options.map((option, i) => (
                                    <li key={i} className={`
                                      ${option === question.correctAnswer ? 'correct-option' : ''}
                                      ${option === studentAnswer && option !== question.correctAnswer ? 'incorrect-option' : ''}
                                    `}>
                                      {option}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="result-code-section">
                      <h4>Coding Challenge</h4>
                      <div className="code-challenge-description">
                        <p>
                          <strong>Problem:</strong> Write a function that finds the
                          maximum number in an array. Your solution should handle
                          edge cases like empty arrays and should be efficient.
                        </p>
                      </div>
                      <div className="code-submission">
                        <h5>Student's Code Submission:</h5>
                        <pre className="code-display">
                          <code>{result.codeAnswer}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div className="result-actions">
                      <button className="action-btn primary">Provide Feedback</button>
                      <button className="action-btn">Download Report</button>
                      <button className="action-btn">Email Student</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pending" && (
            <div className="pending-section">
              <h2>Pending Tests</h2>
              <div className="pending-table">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Test</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placeholderPendingTests.map((test) => (
                      <tr key={test.id}>
                        <td>{test.studentName}</td>
                        <td>{test.testName}</td>
                        <td>{test.dueDate}</td>
                        <td>
                          <span className="status pending">Pending</span>
                        </td>
                        <td>
                          <button className="action-btn">Remind</button>
                          <button className="action-btn">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


        </div>
      </main>
    </div>
  );
}
