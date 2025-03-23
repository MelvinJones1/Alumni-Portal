import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  console.log("ProtectedRoute - Token:", token); // Debugging
  console.log("ProtectedRoute - Role:", role); // Debugging
  console.log("ProtectedRoute - Allowed Role:", allowedRole); // Debugging

  if (!token || !role) {
    console.log("No token or role found. Redirecting to login."); // Debugging
    return <Navigate to="/login" replace />;
  }

  if (
    Array.isArray(allowedRole)
      ? !allowedRole.includes(role)
      : role !== allowedRole
  ) {
    console.log("Role mismatch. Redirecting to login."); // Debugging
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
