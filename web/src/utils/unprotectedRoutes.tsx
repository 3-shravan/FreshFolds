import React from "react";
import { useAuth } from "./authContext";
import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoute = () => {
  const { isLoggedIn, userType } = useAuth();

  if (isLoggedIn) {
    return userType === "user" ? (
      <Navigate to="/user" replace />
    ) : (
      <Navigate to="/admin" replace />
    );
  }
  
  return <Outlet />;
};

export default UnprotectedRoute;
