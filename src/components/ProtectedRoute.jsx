import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, role } = useContext(AuthContext);

  if (!isLoggedIn) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    alert("권한이 없습니다.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
