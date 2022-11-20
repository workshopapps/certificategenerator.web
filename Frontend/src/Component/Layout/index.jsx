// import './layout.style.scss';
// import React from 'react';
// import Hero from '../../component/Hero';
// import Certificate from '../Certificate';
// import BulkStep from '../BulkStep';
// import Testimonials from '../Testimonials';
// import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
      // <Outlet />
      // <Hero />
      // <Certificate />
      // <BulkStep />
      // <Testimonials />
    
  );
};

export default Layout;
