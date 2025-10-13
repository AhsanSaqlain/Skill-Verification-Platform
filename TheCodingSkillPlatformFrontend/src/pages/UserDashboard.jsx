import React, { useState , useEffect, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { 
  UserIcon, 
  ChartBarIcon, 
  ClipboardIcon, 
  AcademicCapIcon,
  ArrowRightIcon,
  Bars3Icon,
  BellIcon,
  ArrowPathIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import './UserDashboard.css';
import UserContext from '../context/UserContext';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state to show a loading spinner
  
  
  const handleLogout = () => {
    // In a real application, you would clear authentication tokens/cookies here
    localStorage.clear()
    window.location.href = '/';
  };

  // Placeholder user data
 // const userData = {
  //  id: 1,
   /* name: "John Doe",
    email: "john@example.com",
    picture: "https://api.dicebear.com/7.x/avatars/svg?seed=john",
    joinDate: "2025-02-15",
    level: "Intermediate",
    testsCompleted: 8,
    totalScore: 87,
    skillLevels: {
      javascript: 85,
      react: 78,
      html: 92,
      css: 88,
      nodejs: 72
    }
  };*/

  // Placeholder test history
  const testHistory = [
    {
      id: 1,
      name: "JavaScript Fundamentals",
      date: "2025-05-10",
      score: 85,
      duration: "45 minutes",
      status: "Completed",
      canRetake: true
    },
    {
      id: 2,
      name: "React Basics",
      date: "2025-04-18",
      score: 92,
      duration: "60 minutes",
      status: "Completed",
      canRetake: true
    },
    {
      id: 3,
      name: "HTML & CSS Mastery",
      date: "2025-03-25",
      score: 78,
      duration: "50 minutes",
      status: "Completed",
      canRetake: false
    },
    {
      id: 4,
      name: "Node.js Essentials",
      date: "2025-03-05",
      score: 65,
      duration: "55 minutes",
      status: "Failed",
      canRetake: true
    }
  ];

  // Placeholder recommended courses
  const recommendedCourses = [
    {
      id: 1,
      name: "Advanced JavaScript Patterns",
      level: "Advanced",
      duration: "4 weeks",
      description: "Master advanced JavaScript patterns and techniques used in modern web development."
    },
    {
      id: 2,
      name: "React State Management",
      level: "Intermediate",
      duration: "3 weeks",
      description: "Learn different state management approaches in React applications."
    },
    {
      id: 3,
      name: "Node.js Performance Optimization",
      level: "Advanced",
      duration: "2 weeks",
      description: "Techniques to optimize Node.js applications for better performance."
    }
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Helper function to determine score class
  const getScoreClass = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'average';
    return 'poor';
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

 // Fetch user data from API when component mounts
  const fetchUserData = async () => {
    const token = localStorage.getItem('access_token'); // Get token from localStorage
    // console.log('Access token:', token); // Add this line
    if (!token) {
      // Redirect to login if no token
      window.location.href = '/';
      return;
    }

    try {
      const response = await API.get('/user/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });

      // Set the response data to state
      setUser({ 
        ...response.data, 
        level: "Intermediate",
        picture: "https://img.freepik.com/free-photo/studio-portrait-adult-blond-caucasian-man-with-short-haircut-black-t-shirt-with-blue-eyes-staring-camera-grey-background_132075-8422.jpg",
        testsCompleted: 8,
        totalScore: 87,
        skillLevels: {
          javascript: 85,
          react: 78,
          html: 92,
          css: 88,
          nodejs: 72
        }
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false)
    }
  };

  // Call fetchUserData once when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  
  return (
    loading ? 'Loading....' :
    <div className="user-dashboard">
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!sidebarCollapsed && <h2>CodeCerd</h2>}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarCollapsed ? <ArrowRightIcon className="toggle-icon" /> : <Bars3Icon className="toggle-icon" />}
          </button>
        </div>
        <div className="sidebar-nav">
          <div className="nav-items-top">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <ChartBarIcon className="nav-icon" />
              <span>Overview</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <UserIcon className="nav-icon" />
              <span>My Skills</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'tests' ? 'active' : ''}`}
              onClick={() => setActiveTab('tests')}
            >
              <ClipboardIcon className="nav-icon" />
              <span>Test History</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <AcademicCapIcon className="nav-icon" />
              <span>Courses</span>
            </button>
            <button
              className="nav-item take-test"
              onClick={() => navigate('/quiz')}
            >
              <span>Take a Test</span>
              <ArrowRightIcon className="nav-icon next-icon" />
            </button>
          </div>
          
          <div className="nav-items-bottom">
            <div className="sidebar-divider"></div>
            <button
              className="nav-item logout"
              onClick={handleLogout}
            >
              <ArrowLeftOnRectangleIcon className="nav-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-title">
            <h1>User Dashboard</h1>
          </div>
          
          <div className="header-actions">
            <div className="notification-badge">
              <BellIcon />
            </div>
            
            <div className="user-profile">
              <img
                src={user.picture}
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-level">{user.level}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-section">
              {/* User Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon purple">
                    <ClipboardIcon />
                  </div>
                  <div className="stat-value">{user.testsCompleted}</div>
                  <div className="stat-label">Tests Completed</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <ChartBarIcon />
                  </div>
                  <div className="stat-value">{user.totalScore}%</div>
                  <div className="stat-label">Average Score</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon green">
                    <AcademicCapIcon />
                  </div>
                  <div className="stat-value">{Object.keys(user.skillLevels).length}</div>
                  <div className="stat-label">Skills</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon amber">
                    <UserIcon />
                  </div>
                  <div className="stat-value">{user.level}</div>
                  <div className="stat-label">Current Level</div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-timeline">
                  {testHistory.slice(0, 3).map((test) => (
                    <div className="timeline-item" key={test.id}>
                      <div className="timeline-icon">
                        <ClipboardIcon />
                      </div>
                      <div className="timeline-content">
                        <h3>{test.name}</h3>
                        <p>
                          You scored <span className={`score ${getScoreClass(test.score)}`}>{test.score}%</span> on {formatDate(test.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skill Progress */}
              <div className="skill-progress-section">
                <h2>Skill Progress</h2>
                <div className="skill-progress-grid">
                  {Object.entries(user.skillLevels).map(([skill, level]) => (
                    <div className="skill-progress-card" key={skill}>
                      <div className="skill-header">
                        <h3>{skill.charAt(0).toUpperCase() + skill.slice(1)}</h3>
                        <span className={`score ${getScoreClass(level)}`}>{level}%</span>
                      </div>
                      <div className="progress-bar-container">
                        <div 
                          className={`progress-bar ${getScoreClass(level)}`} 
                          style={{ width: `${level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recommended Courses */}
              <div className="recommended-courses">
                <h2>Recommended Courses</h2>
                <div className="courses-grid">
                  {recommendedCourses.map((course) => (
                    <div className="course-card" key={course.id}>
                      <div className="course-header">
                        <h3>{course.name}</h3>
                        <span className="course-level">{course.level}</span>
                      </div>
                      <p className="course-description">{course.description}</p>
                      <div className="course-footer">
                        <span className="course-duration">{course.duration}</span>
                        <button className="enroll-button">Enroll Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="skills-section">
              <div className="section-header">
                <h2>My Skills</h2>
              </div>
              
              <div className="skills-detail-grid">
                {Object.entries(user.skillLevels).map(([skill, level]) => (
                  <div className="skill-detail-card" key={skill}>
                    <div className="skill-icon" style={{ backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.1)` }}>
                      {skill.charAt(0).toUpperCase()}
                    </div>
                    <div className="skill-detail-content">
                      <h3>{skill.charAt(0).toUpperCase() + skill.slice(1)}</h3>
                      <div className="progress-bar-container">
                        <div 
                          className={`progress-bar ${getScoreClass(level)}`} 
                          style={{ width: `${level}%` }}
                        ></div>
                      </div>
                      <div className="skill-metrics">
                        <div className="skill-metric">
                          <span className="metric-label">Proficiency</span>
                          <span className={`metric-value ${getScoreClass(level)}`}>{level}%</span>
                        </div>
                        <div className="skill-metric">
                          <span className="metric-label">Level</span>
                          <span className="metric-value">
                            {level >= 90 ? 'Expert' : level >= 75 ? 'Advanced' : level >= 60 ? 'Intermediate' : 'Beginner'}
                          </span>
                        </div>
                      </div>
                      <div className="skill-actions">
                        <button className="skill-action-btn">Practice</button>
                        <button className="skill-action-btn">Take Test</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="skill-recommendations">
                <h2>Recommended Skills to Learn</h2>
                <div className="recommended-skills-grid">
                  <div className="recommended-skill-card">
                    <div className="skill-icon">T</div>
                    <h3>TypeScript</h3>
                    <p>Enhance your JavaScript with static typing</p>
                    <button className="start-learning-btn">Start Learning</button>
                  </div>
                  <div className="recommended-skill-card">
                    <div className="skill-icon">G</div>
                    <h3>GraphQL</h3>
                    <p>Modern API query language for your applications</p>
                    <button className="start-learning-btn">Start Learning</button>
                  </div>
                  <div className="recommended-skill-card">
                    <div className="skill-icon">D</div>
                    <h3>Docker</h3>
                    <p>Containerize your applications for better deployment</p>
                    <button className="start-learning-btn">Start Learning</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Test History Tab */}
          {activeTab === 'tests' && (
            <div className="tests-section">
              <div className="section-header">
                <h2>Test History</h2>
              </div>
              
              <div className="table-container">
                <div className="table-header">
                  <h3>All Tests ({testHistory.length})</h3>
                  <div className="table-filters">
                    <div className="filter-item">
                      <select className="filter-select">
                        <option>All Tests</option>
                        <option>Completed</option>
                        <option>Failed</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Test Name</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testHistory.map((test) => (
                        <tr key={test.id}>
                          <td style={{ fontWeight: '500' }}>{test.name}</td>
                          <td>{formatDate(test.date)}</td>
                          <td>
                            <span className={`score ${getScoreClass(test.score)}`}>
                              {test.score}%
                            </span>
                          </td>
                          <td>{test.duration}</td>
                          <td>
                            <span className={`status ${test.status.toLowerCase()}`}>
                              {test.status}
                            </span>
                          </td>
                          <td>
                            <button className="action-btn view">View Results</button>
                            {test.canRetake && (
                              <button className="action-btn retake">
                                <ArrowPathIcon style={{ width: '14px', height: '14px', marginRight: '4px' }} />
                                Retake
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="test-analysis">
                <h2>Test Performance Analysis</h2>
                <div className="analysis-cards">
                  <div className="analysis-card">
                    <h3>Strongest Areas</h3>
                    <ul className="analysis-list">
                      <li>React Components (95%)</li>
                      <li>HTML Structure (92%)</li>
                      <li>CSS Flexbox (90%)</li>
                    </ul>
                  </div>
                  <div className="analysis-card">
                    <h3>Areas to Improve</h3>
                    <ul className="analysis-list">
                      <li>Node.js Async (65%)</li>
                      <li>JavaScript Closures (68%)</li>
                      <li>React Hooks (72%)</li>
                    </ul>
                  </div>
                  <div className="analysis-card">
                    <h3>Recommended Tests</h3>
                    <ul className="analysis-list">
                      <li>Advanced JavaScript Concepts</li>
                      <li>Node.js Fundamentals</li>
                      <li>React State Management</li>
                    </ul>
                    <button className="view-all-btn">View All Tests</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="courses-section">
              <div className="section-header">
                <h2>Available Courses</h2>
              </div>
              
              <div className="courses-filter">
                <div className="filter-group">
                  <label>Filter by Level:</label>
                  <select className="filter-select">
                    <option>All Levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Filter by Category:</label>
                  <select className="filter-select">
                    <option>All Categories</option>
                    <option>JavaScript</option>
                    <option>React</option>
                    <option>Node.js</option>
                    <option>HTML/CSS</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Sort by:</label>
                  <select className="filter-select">
                    <option>Recommended</option>
                    <option>Newest</option>
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                  </select>
                </div>
              </div>
              
              <div className="courses-grid expanded">
                {[...recommendedCourses, 
                  {
                    id: 4,
                    name: "CSS Grid & Flexbox Mastery",
                    level: "Intermediate",
                    duration: "2 weeks",
                    description: "Master modern CSS layout techniques with Grid and Flexbox."
                  },
                  {
                    id: 5,
                    name: "JavaScript Testing with Jest",
                    level: "Intermediate",
                    duration: "3 weeks",
                    description: "Learn how to write effective tests for your JavaScript applications."
                  },
                  {
                    id: 6,
                    name: "Full-Stack Development with MERN",
                    level: "Advanced",
                    duration: "6 weeks",
                    description: "Build complete applications with MongoDB, Express, React, and Node.js."
                  }
                ].map((course) => (
                  <div className="course-card" key={course.id}>
                    <div className="course-header">
                      <h3>{course.name}</h3>
                      <span className="course-level">{course.level}</span>
                    </div>
                    <p className="course-description">{course.description}</p>
                    <div className="course-footer">
                      <span className="course-duration">{course.duration}</span>
                      <button className="enroll-button">Enroll Now</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="enrolled-courses">
                <h2>My Enrolled Courses</h2>
                <div className="enrolled-courses-grid">
                  <div className="enrolled-course-card">
                    <div className="course-progress">
                      <div className="progress-circle" style={{ '--progress': '75%' }}>
                        <span>75%</span>
                      </div>
                    </div>
                    <div className="enrolled-course-content">
                      <h3>JavaScript Fundamentals</h3>
                      <p>Master the core concepts of JavaScript programming</p>
                      <div className="course-meta">
                        <span>Intermediate</span>
                        <span>•</span>
                        <span>8 modules completed</span>
                      </div>
                      <button className="continue-button">Continue Learning</button>
                    </div>
                  </div>
                  <div className="enrolled-course-card">
                    <div className="course-progress">
                      <div className="progress-circle" style={{ '--progress': '30%' }}>
                        <span>30%</span>
                      </div>
                    </div>
                    <div className="enrolled-course-content">
                      <h3>HTML & CSS Basics</h3>
                      <p>Learn the fundamentals of web design with HTML and CSS</p>
                      <div className="course-meta">
                        <span>Beginner</span>
                        <span>•</span>
                        <span>3 modules completed</span>
                      </div>
                      <button className="continue-button">Continue Learning</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
