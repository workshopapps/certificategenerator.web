import "./Style/App.scss";
import Navbar from "./Component/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./Component/Signup-Login/assets/Sginup";
import Login from "./Component/Signup-Login/assets/Login";
import {
  AboutUs,
  BulkPreview,
  BulkStep,
  Career,
  Choice,
  ComingSoon,
  ContactUs,
  Dashboard,
  EditBulk,
  Error,
  FAQ,
  Layout,
  Pricing,
  SinglePreview,
  Team,
  Templates,
  Terms,
  UploadCSV,
  Profile,
} from "./pages";
// import Footer from './Component/Footer';

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import { Privacy } from "./pages/PrivacyPolicy";
import { useState } from "react";

function App() {
  const [logo, setLogo] = useState("");
  const [certificateTitle, setCertificateTitle] = useState("");
  const [awardeeName, setAwardeeName] = useState("");
  const [message, setMessage] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issueDate, setIssueDate] = useState("");

  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home
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
            />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/career" element={<Career />} />
            <Route path="choice" element={<Choice />} />
            <Route path="/team" element={<Team />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/single_preview" element={<SinglePreview
              logo={logo}
              certificateTitle={certificateTitle}
              awardeeName={awardeeName}
              message={message}
              issuedBy={issuedBy}
              issueDate={issueDate}
            />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/bulk_preview" element={<BulkPreview />} />
            <Route path="/bulk_step" element={<BulkStep />} />
            <Route path="/edit_bulk" element={<EditBulk />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadCSV />} />

            <Route path="/privacy" element={<Privacy />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
