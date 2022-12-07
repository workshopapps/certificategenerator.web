import React from 'react'
import { Navigate } from 'react-router-dom'

const userAuth = () => {
  const userDetails = localStorage.getItem("user", "token")
  
  return userDetails;
};

const ProtectedRoutes = ({children}) => {
  const isAuth = userAuth();

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes