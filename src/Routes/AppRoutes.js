import React from 'react';
import { Routes } from 'react-router-dom';
import publicRoutes from './PublicRoutes';
import adminRoutes from './Auth/AdminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
         {/* Puedes añadir más grupos de rutas aquí */}
      {publicRoutes}
      {adminRoutes}
    </Routes>
  );
};

export default AppRoutes;
