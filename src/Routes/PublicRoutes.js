
import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import AboutUs from '../Pages/Public/AboutUs';
import Contact from '../Pages/Public/Contact';

const publicRoutes = (
  <>
    {/* Rutas Publicas */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact" element={<Contact/>} />
  </>
);

export default publicRoutes;
