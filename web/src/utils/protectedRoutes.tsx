
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import React from "react";

export const ProtectedRoute = () => {
  const { isLoggedIn, userType } = useAuth();
  setTimeout(() => {
    if (!isLoggedIn) return <Navigate to="/" replace />;
  }, 1000);
 
  if (userType !== "user") return <Navigate to="/admin" />;
  return <Outlet />;
};

export const ProtectedRouteAdmin = () => {
  const { isLoggedIn, userType } = useAuth();
  if (!isLoggedIn) return <Navigate to="/"  replace/>;
  if (userType !== "admin") return <Navigate to="/user" />;
  return <Outlet />;
};




