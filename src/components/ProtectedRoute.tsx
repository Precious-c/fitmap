import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loader bgColor="white" />;
  }

  if (!user) {
    // if User is not authenticated, redirect to the sign-in page
    return <Navigate to="/signin" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
