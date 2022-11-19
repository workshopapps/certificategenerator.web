import './layout.style.scss';
import Footer from '../../component/Footer';
import React from 'react';
import Hero from '../../component/Hero';
import Certificate from '../Certificate';
import BulkStep from '../BulkStep';
import Testimonials from '../Testimonials';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Hero />
      <Certificate />
      <BulkStep />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Layout;
