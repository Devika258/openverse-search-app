import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute component:
 * Protects routes from unauthorized access.
 * If a valid token is found in localStorage, it renders the child component.
 * Otherwise, it redirects to the login page.
 */
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

