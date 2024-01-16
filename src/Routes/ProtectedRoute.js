import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Utils/AuthContext';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { userRoles, isAuthenticated } = useAuth();

  if (!isAuthenticated || !requiredRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
