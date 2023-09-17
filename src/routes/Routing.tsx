import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import PrivacyPolicy from '@/views/privacy/Policy';
import { useEffect, useRef } from 'react';
import Contact from '@/pages/Contact';

const Routing = () => {
  const taaiChartRef = useRef(null);
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/policy' element={<PrivacyPolicy />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
};

export default Routing;
