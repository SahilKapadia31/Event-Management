// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Handle loading state

  // If no user is logged in, redirect to login page
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;