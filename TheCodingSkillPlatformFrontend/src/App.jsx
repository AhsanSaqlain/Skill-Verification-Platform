import API from './utils/api';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Quizz from "./pages/Quizz";
import "./App.css";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

import { AcademicCapIcon, CameraIcon, ChartBarIcon, CodeBracketIcon, UserGroupIcon, DocumentCheckIcon, XMarkIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";
import UserProvider from './context/UserProvider';
import Login from './components/Login';
import SignUp from './components/SignUp';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Landing page scroll animations
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })
  
  const HomePage = () => (
    <div className="landing-container">
      {/* ... existing landing page content ... */}
    </div>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(203, 213, 225, 0.1)",
        },
        ticks: {
          color: "#cbd5e1",
        },
      },
      x: {
        grid: {
          color: "rgba(203, 213, 225, 0.1)",
        },
        ticks: {
          color: "#cbd5e1",
        },
      },
    },
  };

  const performanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Student Performance",
        data: [65, 78, 85, 92],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const skillsData = {
    labels: [
      "Problem Solving",
      "Code Quality",
      "Time Management",
      "Optimization",
    ],
    datasets: [
      {
        label: "Skills Assessment",
        data: [85, 92, 78, 88],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(45, 212, 191, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const engagementData = {
    labels: ["Focused", "Distracted", "Interactive"],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          "rgba(139, 92, 246, 0.8)",
          "rgba(99, 102, 241, 0.4)",
          "rgba(45, 212, 191, 0.6)",
        ],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const closeMenuOnResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", closeMenuOnResize);

    // Disable body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", closeMenuOnResize);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Handle showing login modal when visiting the /login route
    if (window.location.pathname === "/login") {
      setShowLoginModal(true); // Show the login modal
    } else {
      setShowLoginModal(false); // Hide login modal on other pages
    }
  }, [window.location.pathname]); // Trigger whenever pathname changes

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/quiz" element={<Quizz />} />
          <Route path="/quiz/:languageUrlParam" element={<Quizz />} />
          <Route
      path="/login"
      element={
        <div className="landing-container">
          {/* ...your landing page content... */}
          {showLoginModal && (
            <div className="modal-overlay">
              {/* ...login modal code... */}
            </div>
          )}
        </div>
      }
    />
          <Route
            path="/"
            element={
              <div className="landing-container">
                <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                  {isMobileMenuOpen && (
                    <div
                      className="mobile-menu-backdrop"
                      onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                  )}
                  <div className="nav-logo">
                    <CodeBracketIcon className="nav-logo-icon" />
                    CodeCerd
                  </div>
                  <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    <div
                      className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </button>
                  <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
                    <li>
                      <a href="#hero" onClick={() => setIsMobileMenuOpen(false)}>
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#features"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                  <div className="nav-actions">
                    <button
                      className="admin-access-btn"
                      onClick={() => setShowAdminLoginModal(true)}
                      title="Admin Login"
                    >
                      <div className="admin-btn-content">
                        <KeyIcon className="admin-icon" />
                        <span>Admin</span>
                      </div>
                    </button>
                    <button
                      className="nav-btn login"
                      onClick={() => setShowLoginModal(true)}
                    >
                      Log in
                    </button>
                    <button
                      className="nav-btn signup"
                      onClick={() => setShowSignupModal(true)}
                    >
                      Sign up free
                    </button>
                  </div>
                </nav>

                {/* Admin Login Modal */}
                {showAdminLoginModal && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3>Admin Login</h3>
                        <button
                          className="modal-close"
                          onClick={() => setShowAdminLoginModal(false)}
                        >
                          <XMarkIcon className="close-icon" />
                        </button>
                      </div>
                      <form
                        className="auth-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const username = e.target.adminUsername.value;
                          const password = e.target.adminPassword.value;

                          // Check for the specified credentials
                          if (username === "codecerd" && password === "admin") {
                            window.location.href = "/admin";
                          } else {
                            alert("Invalid admin credentials. Please try again.");
                          }
                        }}
                      >
                        <div className="input-group">
                          <label htmlFor="adminUsername">Username</label>
                          <input type="text" id="adminUsername" required />
                        </div>
                        <div className="input-group">
                          <label htmlFor="adminPassword">Password</label>
                          <input type="password" id="adminPassword" required />
                        </div>
                        <button type="submit" className="cta-btn primary">
                          Login as Admin
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Login Modal */}
                {showLoginModal && (
                  <Login model={{ setShowSignupModal, setShowLoginModal }} />
                )}

                {/* Signup Modal */}
                {showSignupModal && (
                  <SignUp model={{ setShowSignupModal, setShowLoginModal }} />
                )}

                <section className="hero" id="hero">
                  <div className="hero-inner">
                    <div className="hero-content">
                      <div className="hero-badge">
                        <span>🚀 Next-Gen Coding Assessment</span>
                      </div>
                      <h1>Master Your Coding Journey</h1>
                      <p className="hero-description">
                        Level up your coding skills with AI-powered assessments and
                        real-time feedback. Start your journey to becoming a better
                        developer today.
                      </p>
                      <div className="hero-actions">
                        <button className="cta-btn secondary">Watch Demo</button>
                        <div className="hero-design-elements">
                          <span className="design-element-item">
                            <CodeBracketIcon className="hero-icon-small" /> Rapid Skill Tests
                          </span>
                          <span className="design-element-item">
                            <ChartBarIcon className="hero-icon-small" /> Detailed Analytics
                          </span>
                          <span className="design-element-item">
                            <AcademicCapIcon className="hero-icon-small" /> Master Concepts
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hero-image-wrapper">
                      <img
                        src="/hero.png"
                        alt="Coding education illustration"
                        className="hero-image"
                      />
                    </div> {/* Closes hero-image-wrapper */}
                  </div> {/* Closes hero-inner */}
                </section>

                {/* Marquee Divider */}
                <div className="marquee-divider">
                  <div className="marquee-content">
                    <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                        <div className="marquee-item">
                          <span className="token-punctuation">{"<"}</span>
                          <span className="token-tag">HTML</span>
                          <span className="token-punctuation">{"/>"}</span>
                        </div>
                        <div className="marquee-item">
                          <span className="token-punctuation">{"{"}</span>
                          <span className="token-property">CSS</span>
                          <span className="token-punctuation">{"}"}</span>
                        </div>
                        <div className="marquee-item">
                          <span className="token-punctuation">()</span>
                          <span className="token-function">JavaScript</span>
                          <span className="token-operator">{"=>"}</span>
                        </div>

                        <div className="marquee-item">
                          <span className="token-keyword">const</span>
                          <span className="token-function">Python</span>
                          <span className="token-operator">=</span>
                          <span className="token-keyword">True</span>
                        </div>
                        <div className="marquee-item">
                          <span className="token-punctuation">{"{"}</span>
                          <span className="token-string">"JSON"</span>
                          <span className="token-punctuation">{"}"}</span>
                        </div>
                        <div className="marquee-item">
                          <span className="token-keyword">git</span>
                          <span className="token-function">commit</span>
                          <span className="token-operator">-m</span>
                        </div>
                        <div className="marquee-item">
                          <span className="token-keyword">npm</span>
                          <span className="token-function">install</span>
                          <span className="token-operator">--save</span>
                        </div>
                      </div>
                  </div>
                </div>

                <section
                  className={`about-section dark-theme ${aboutInView ? "fade-in-up" : ""}`}
                  id="about"
                  ref={aboutRef}
                >
                  <div className="dark-bg-pattern"></div>
                  <div className="section-header">
                    <h2 className="dark-heading">Essential CodeCerd Skills</h2>
                    <p className="about-description">
                      Develop crucial modern developer skills, from algorithmic thinking to clean code. Build a strong programming foundation for real-world software challenges.
                    </p>
                  </div>
                  <div className="about-grid">
                    <div className="about-card dark-card">
                      <div className="icon-container purple">
                        <CodeBracketIcon className="about-icon" />
                      </div>
                      <h3>Problem Solving</h3>
                      <p>
                        Learn to break down complex problems and develop efficient
                        algorithmic solutions through hands-on coding challenges.
                      </p>
                      <div className="stat-pill dark-pill">
                        <span>Practice Problems</span>
                        <span className="pill-value glow-text">500+</span>
                      </div>
                    </div>
                    <div className="about-card dark-card">
                      <div className="icon-container blue">
                        <DocumentCheckIcon className="about-icon" />
                      </div>
                      <h3>Clean Code</h3>
                      <p>
                        Master the art of writing maintainable, readable, and
                        efficient code following industry best practices.
                      </p>
                      <div className="stat-pill dark-pill">
                        <span>Code Quality</span>
                        <span className="pill-value glow-text">A+</span>
                      </div>
                    </div>

                    <div className="about-card dark-card">
                      <div className="icon-container green">
                        <ChartBarIcon className="about-icon" />
                      </div>
                      <h3>Data Structures</h3>
                      <p>
                        Build expertise in essential data structures and
                        understand when and how to apply them effectively.
                      </p>
                      <div className="stat-pill dark-pill">
                        <span>Topics Covered</span>
                        <span className="pill-value glow-text">25+</span>
                      </div>
                    </div>


                  </div>
                </section>

                <section
                  className={`features ${featuresInView ? "fade-in-up" : ""}`}
                  id="features"
                  ref={featuresRef}
                >
                  <div className="section-header">
                    <h2>Advanced Features</h2>
                    <p className="section-subtitle">
                      Powerful tools for skill assessment
                    </p>
                  </div>
                  <div className="features-grid">
                    <div className="feature-card">
                      <div className="feature-icon-wrapper">
                        <CodeBracketIcon className="feature-icon" />
                      </div>
                      <h3>Performance Tracking</h3>
                      <p>
                        Track your progress over time with detailed performance
                        metrics
                      </p>
                      <div className="chart-container">
                        <Line options={chartOptions} data={performanceData} />
                      </div>
                      <ul className="feature-list">
                        <li>Real-time progress tracking</li>
                        <li>Performance analytics</li>
                        <li>Improvement suggestions</li>
                      </ul>
                    </div>

                    <div className="feature-card">
                      <div className="feature-icon-wrapper">
                        <ChartBarIcon className="feature-icon" />
                      </div>
                      <h3>Skills Analysis</h3>
                      <p>
                        Comprehensive breakdown of your coding skills and
                        abilities
                      </p>
                      <div className="chart-container">
                        <Bar options={chartOptions} data={skillsData} />
                      </div>
                      <ul className="feature-list">
                        <li>Detailed skill assessment</li>
                        <li>Strength identification</li>
                        <li>Areas for improvement</li>
                      </ul>
                    </div>

                    <div className="feature-card">
                      <div className="feature-icon-wrapper">
                        <CameraIcon className="feature-icon" />
                      </div>
                      <h3>AI Engagement Metrics</h3>
                      <p>AI-powered analysis of your coding session engagement</p>
                      <div className="chart-container">
                        <Doughnut
                          options={{
                            ...chartOptions,
                            plugins: {
                              ...chartOptions.plugins,
                              legend: {
                                ...chartOptions.plugins.legend,
                                position: "bottom",
                              },
                            },
                          }}
                          data={engagementData}
                        />
                      </div>
                      <ul className="feature-list">
                        <li>Focus time tracking</li>
                        <li>Engagement patterns</li>
                        <li>Behavioral insights</li>
                      </ul>
                    </div>


                  </div>
                </section>

                {/* Supported Languages Section */}
                <section className="languages-section" id="languages">
                  <div className="section-header">
                    <h2>All the Modern Languages Supported</h2>
                    <p className="section-subtitle">
                      Our platform supports a wide range of programming languages to help you master your coding skills
                    </p>
                  </div>
                  <div className="languages-content">
                    <div className="languages-image-container">
                      <img src="/feature.png" alt="Supported programming languages" className="languages-image" />
                    </div>
                    <div className="languages-list">
                      <div className="language-item">
                        <span className="language-icon">JS</span>
                        <span className="language-name">JavaScript</span>
                      </div>
                      <div className="language-item">
                        <span className="language-icon">PY</span>
                        <span className="language-name">Python</span>
                      </div>
                      <div className="language-item">
                        <span className="language-icon">JV</span>
                        <span className="language-name">Java</span>
                      </div>
                      <div className="language-item">
                        <span className="language-icon">C#</span>
                        <span className="language-name">C#</span>
                      </div>
                      <div className="language-item">
                        <span className="language-icon">TS</span>
                        <span className="language-name">TypeScript</span>
                      </div>
                      <div className="language-item">
                        <span className="language-icon">GO</span>
                        <span className="language-name">Go</span>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/*contact section*/}
                <section
                  className={`contact-section ${
                    contactInView ? "fade-in-up" : ""
                  }`}
                  id="contact"
                  ref={contactRef}
                >
                  <div className="contact-content">
                    <div className="contact-info">
                      <div className="section-header">
                        <h2>Let's Talk!</h2>
                        <p className="contact-subtitle">
                          Get in touch with our team
                        </p>
                      </div>
                      <div className="contact-details">
                        <div className="contact-item">
                          <CodeBracketIcon className="contact-icon" />
                          <div>
                            <h4>Technical Support</h4>
                            <p>support@codecerd.dev</p>
                          </div>
                        </div>
                        <div className="contact-item">
                          <UserGroupIcon className="contact-icon" />
                          <div>
                            <h4>Business Inquiries</h4>
                            <p>business@codecerd.dev</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-form-wrapper">
                      <form className="contact-form">
                        <div className="form-header">
                          <h3>Send us a message</h3>
                          <p>We'll get back to you within 24 hours</p>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" required />
                          </div>
                          <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" required />
                          </div>
                        </div>
                        <div className="input-group">
                          <label htmlFor="subject">Subject</label>
                          <input type="text" id="subject" required />
                        </div>
                        <div className="input-group">
                          <label htmlFor="message">Message</label>
                          <textarea id="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" className="cta-btn primary">
                          Send Message <span>→</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </section>

                <footer className="footer">
                  <div className="footer-content">
                    <div className="footer-main">
                      <div className="footer-brand">
                        <div className="footer-logo">
                          <CodeBracketIcon className="footer-logo-icon" />
                          <h3>CodeCerd</h3>
                        </div>
                        <p>
                          Empowering developers through AI-powered assessments.
                        </p>
                        <div className="footer-social">
                          <a href="#!" className="social-link">
                            <span>Twitter</span>
                          </a>
                          <a href="#!" className="social-link">
                            <span>LinkedIn</span>
                          </a>
                          <a href="#!" className="social-link">
                            <span>GitHub</span>
                          </a>
                        </div>
                      </div>
                      <div className="footer-links-grid">
                        <div className="footer-column">
                          <h4>Platform</h4>
                          <a href="#features">Features</a>
                          <a href="#about">About Us</a>
                          <a href="#contact">Contact</a>
                          <a href="#!">Pricing</a>
                        </div>
                        <div className="footer-column">
                          <h4>Resources</h4>
                          <a href="#!">Documentation</a>
                          <a href="#!">Blog</a>
                          <a href="#!">Support Center</a>
                          <a href="#!">FAQ</a>
                        </div>
                        <div className="footer-column">
                          <h4>Legal</h4>
                          <a href="#!">Privacy Policy</a>
                          <a href="#!">Terms of Service</a>
                          <a href="#!">Security</a>
                          <a href="#!">Compliance</a>
                        </div>
                        <div className="footer-column">
                          <h4>Company</h4>
                          <a href="#!">Careers</a>
                          <a href="#!">Partners</a>
                          <a href="#!">News</a>
                          <a href="#!">Press Kit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-bottom">
                    <div className="footer-bottom-content">
                      <p>
                        &copy; {new Date().getFullYear()} CodeCerd Platform. All
                        rights reserved.
                      </p>
                      <div className="footer-bottom-links">
                        <a href="#!">Terms</a>
                        <a href="#!">Privacy</a>
                        <a href="#!">Cookies</a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
