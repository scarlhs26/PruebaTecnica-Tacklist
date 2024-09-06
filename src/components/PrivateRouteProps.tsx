// src/components/RouteProtection.tsx
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = localStorage.getItem('authToken');
  return token ? element : <Navigate to="/login" />;
};

export const PublicRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = localStorage.getItem('authToken');
  return !token ? element : <Navigate to="/checklist" />;
};
