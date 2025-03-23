import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AlumniLandingPage = () => {
  const navigate = useNavigate();
  const [alumniName, setAlumniName] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("");

  // Role Check
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (!role || role !== "alumni") {
      navigate("/studentLanding", {
        state: {
          from: "protectedRoute",
          message: "You are not authorized to access this page.",
        },
      });
    }
  }, [navigate]);

  // Fetch alumni name
  useEffect(() => {
    const fetchAlumniName = async () => {
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

        setAlumniName(response.data.name);
      } catch (error) {
        console.error("Error fetching alumni name:", error);
      }
    };

    fetchAlumniName();
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("isApproved");
    navigate("/login");
  };

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
          Welcome, {alumniName || "Alumni"}!
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Connect with students, post jobs, and contribute to the community.
        </p>
        {redirectMessage && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <p>{redirectMessage}</p>
          </div>
        )}
      </section>

      {/* Feature Cards */}
      <section className="py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Post a Job Card */}
          <Link
            to="/post-job"
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 group p-6 text-center"
          >
            <div className="text-5xl text-blue-600 group-hover:text-blue-800 mb-4">
              💼
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Post a Job
            </h3>
            <p className="text-gray-600 mt-2">
              Share job opportunities with students.
            </p>
          </Link>
          {/* Donation Portal Card */}
          <Link
            to="/donation"
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 group p-6 text-center"
          >
            <div className="text-5xl text-blue-600 group-hover:text-blue-800 mb-4">
              💰
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Donation Portal
            </h3>
            <p className="text-gray-600 mt-2">
              Contribute to student scholarships.
            </p>
          </Link>
          {/* Alumni Directory Card */}
          <Link
            to="/directory"
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 group p-6 text-center"
          >
            <div className="text-5xl text-blue-600 group-hover:text-blue-800 mb-4">
              📖
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Alumni Directory
            </h3>
            <p className="text-gray-600 mt-2">
              Find and connect with fellow alumni.
            </p>
          </Link>
          {/* Post Interview Experience Card */}
          <Link
            to="/post-experience"
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 group p-6 text-center"
          >
            <div className="text-5xl text-blue-600 group-hover:text-blue-800 mb-4">
              ✍️
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Post Interview Experience
            </h3>
            <p className="text-gray-600 mt-2">
              Share your interview insights and resources.
            </p>
          </Link>
          <Link
            to="/alumni-chat"
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 group p-6 text-center"
          >
            <div className="text-5xl text-blue-600 group-hover:text-blue-800 mb-4">
              💬
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              Chat with Students
            </h3>
            <p className="text-gray-600 mt-2">
              Connect with students for mentorship.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AlumniLandingPage;
