import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return <>{user && token ? children : <Navigate to="/login" />}</>;
};
export default RequireAuth;
