import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const StudentLandingPage = () => {
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectMessage, setRedirectMessage] = useState("");

  // Role Check
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (!role || role !== "student") {
      navigate("/alumniLanding", {
        state: {
          from: "protectedRoute",
          message: "You are not authorized to access this page.",
        },
      });
    }
  }, [navigate]);

  // Fetch student's name
  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/user/name",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStudentName(response.data.name);
      } catch (error) {
        console.error("Error fetching student name:", error);
      }
    };

    fetchStudentName();
  }, []);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  const features = [
    {
      title: "Jobs",
      description: "Find job opportunities shared by alumni.",
      link: "/jobs",
      icon: "💼",
    },
    {
      title: "Events",
      description: "Discover and join career-related events.",
      link: "/events",
      icon: "📅",
    },
    {
      title: "Mentorship",
      description: "Connect with alumni mentors for guidance.",
      link: "/mentorship",
      icon: "🤝",
    },
    {
      title: "Resume Optimizer",
      description: "Optimize your resume to stand out.",
      link: "/resume",
      icon: "📝",
    },
    {
      title: "Interview Experiences",
      description: "Read alumni interview experiences.",
      link: "/interview-experiences",
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alumni Association</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="text-center py-12 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, {studentName || "Student"}!
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Explore all the features available to you. Start your journey now!
        </p>
        {redirectMessage && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <p>{redirectMessage}</p>
          </div>
        )}
      </section>

      {/* Feature Cards */}
      <section className="py-10 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto justify-items-center">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 group p-6 flex flex-col justify-between min-h-[200px] w-full max-w-sm"
            >
              <div>
                <div className="text-5xl text-blue-600 group-hover:text-blue-800 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentLandingPage;
