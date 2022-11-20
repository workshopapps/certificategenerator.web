import './layout.style.scss';
import React from 'react';
import Hero from '../../component/Hero';
import Certificate from '../Certificate';
import BulkStep from '../BulkStep';
import Navbar from '../../component/Navbar'
import Testimonials from '../Testimonials';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <Hero />
      <Certificate />
      <BulkStep />
      <Testimonials />
    </div>
  );
};

export default Layout;
