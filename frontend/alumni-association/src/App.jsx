import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentLandingPage from "./pages/StudentLandingPage";
import EventsPage from "./components/EventsPage";
import ResumeOptimizerPage from "./components/ResumeOptimizerPage";
import AlumniLandingPage from "./pages/AlumniLandingPage";
import PostJob from "./components/PostJob";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DonationPage from "./components/DonationPage";
import AlumniDirectory from "./components/AlumniDirectory";
import JobsPage from "./components/JobsPage";
import PostExperience from "./components/PostExperience";
import InterviewExperiences from "./components/InterviewExperiences";
import MentorshipPage from "./components/MentorshipPage";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AlumniChatPage from "./components/AlumniChatPage";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path="/studentLanding" element={<StudentLandingPage />} />
        <Route path="/resume" element={<ResumeOptimizerPage />} />
      </Route>

      {/* Alumni Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="alumni" />}>
        <Route path="/alumniLanding" element={<AlumniLandingPage />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/post-experience" element={<PostExperience />} />
        <Route path="/alumni-chat" element={<AlumniChatPage />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* General Protected Routes (For both Students and Alumni) */}
      <Route element={<ProtectedRoute allowedRole={["student", "alumni"]} />}>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/directory" element={<AlumniDirectory />} />
        <Route
          path="/interview-experiences"
          element={<InterviewExperiences />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
