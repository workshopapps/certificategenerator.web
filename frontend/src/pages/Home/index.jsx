import React from 'react'
import Hero from './Hero';
import Certificate from './Certificate';
import BulkStep from './BulkStep';
import Testimonials from './Testimonials';
import { Outlet } from 'react-router-dom';

const Home = ({
  logo,
  setLogo,
  certificateTitle,
  setCertificateTitle,
  awardeeName,
  setAwardeeName,
  message,
  setMessage,
  issuedBy,
  setIssuedBy,
  issueDate,
  setIssueDate
}) => {

  return (
    <div>
      <Outlet />
      <Hero />
      <Certificate
        logo={logo}
        setLogo={setLogo}
        certificateTitle={certificateTitle}
        setCertificateTitle={setCertificateTitle}
        awardeeName={awardeeName}
        setAwardeeName={setAwardeeName}
        message={message}
        setMessage={setMessage}
        issuedBy={issuedBy}
        setIssuedBy={setIssuedBy}
        issueDate={issueDate}
        setIssueDate={setIssueDate}
      />
      <BulkStep />
      <Testimonials />
    </div>
  )
}

export default Home

