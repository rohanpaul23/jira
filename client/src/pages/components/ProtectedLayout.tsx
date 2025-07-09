// src/components/ProtectedLayout.tsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/auth';

const ProtectedLayout: React.FC = () =>
  isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;

export default ProtectedLayout;
