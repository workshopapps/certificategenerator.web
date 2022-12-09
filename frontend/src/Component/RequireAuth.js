import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const user = userData.userId
  const token = userData.token
  return <>{user && token ? children : <Navigate to="/login" />}</>;
};
export default RequireAuth;
