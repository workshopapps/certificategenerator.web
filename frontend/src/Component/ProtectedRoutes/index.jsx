import React from 'react'
import { Navigate } from 'react-router-dom'

const userIsAuth = () => {
  const userIsAuthDetails = localStorage.getItem("userData")
  
  return userIsAuthDetails;
};

export const IsAuthProtectedRoutes = ({children}) => {
  const userAuth = userIsAuth();

  return !userAuth ? children : <Navigate to="/dashboard" />;
};

const userAuth = () => {
  const userDetails = localStorage.getItem("userData")
  
  return userDetails;
};
const ProtectedRoutes = ({children}) => {
  const isAuth = userAuth();

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes