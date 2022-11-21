import React from 'react'
import Hero from './Hero';
import Certificate from './Certificate';
import BulkStep from './BulkStep';
import Testimonials from './Testimonials';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Outlet />
      <Hero />
      <Certificate />
      <BulkStep />
      <Testimonials />
    </div>
  )
}

export default Home

