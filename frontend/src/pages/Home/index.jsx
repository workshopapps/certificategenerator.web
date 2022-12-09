import React from "react";
import { Outlet } from "react-router-dom";

import Hero from "./Hero";
import Certificate from "./Certificate";
import BulkStep from "./BulkStep";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import useAppProvider from "../../hooks/useAppProvider";

const Home = () => {
  const {
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
  } = useAppProvider();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
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
      <Partners />
      <BulkStep />
      <Testimonials />
    </div>
  );
};

export default Home;
