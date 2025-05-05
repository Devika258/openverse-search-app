import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If token exists - allow access
  if (token) {
    return children;
  }

  // No token then Redirect to login
  return <Navigate to="/login" />;
};

export default PrivateRoute;

