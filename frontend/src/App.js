import * as Sentry from "@sentry/react";
import { useState, useEffect } from "react";

import {
  AboutUs,
  BulkStep,
  BulkPreview,
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
  Preview,
  Team,
  Templates,
  Terms,
  ProfilePage,
  UploadCSV
} from "./pages";
import "./Style/App.scss";
import {
  ChangePassword,
  ForgotPassword,
  PasswordLinkSent,
  ResetPassword,
  PasswordChangeSuccessfully
} from "./pages/ResetPassword";
import Home from "./pages/Home";
import { Loader } from "./Component";
import Navbar from "./Component/Navbar";
import Checkout from "./pages/Checkout";
import { Privacy } from "./pages/PrivacyPolicy";
import { AppProvider } from "./contexts/AppProvider";
import Login from "./Component/Signup-Login/assets/Login";
import Signup from "./Component/Signup-Login/assets/Sginup";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [logo, setLogo] = useState("");
  const [access, setAccess] = useState();
  const [message, setMessage] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [awardeeName, setAwardeeName] = useState("");
  const [appLoading, setAppLoading] = useState(true);
  const [certificateTitle, setCertificateTitle] = useState("");

  useEffect(() => {
    setTimeout(function () {
      setAppLoading(false);
    }, 100);
  }, []);

  if (appLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "250px"
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Home
                    logo={logo}
                    message={message}
                    setLogo={setLogo}
                    issuedBy={issuedBy}
                    issueDate={issueDate}
                    setMessage={setMessage}
                    awardeeName={awardeeName}
                    setIssuedBy={setIssuedBy}
                    setIssueDate={setIssueDate}
                    setAwardeeName={setAwardeeName}
                    certificateTitle={certificateTitle}
                    setCertificateTitle={setCertificateTitle}
                  />
                }
              />
              <Route 
              path="/signup" 
              element={<Signup access={access} setAccess={setAccess} />} />
              <Route
                path="/login"
                element={<Login access={access} setAccess={setAccess} />}
              />
              <Route path="/comingsoon" element={<ComingSoon />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    logo={logo}
                    message={message}
                    setLogo={setLogo}
                    issuedBy={issuedBy}
                    issueDate={issueDate}
                    setMessage={setMessage}
                    awardeeName={awardeeName}
                    setIssuedBy={setIssuedBy}
                    setIssueDate={setIssueDate}
                    setAwardeeName={setAwardeeName}
                    certificateTitle={certificateTitle}
                    setCertificateTitle={setCertificateTitle}
                  />
                }
              />
              <Route path="/templates" element={<Templates />} />
              <Route path="/career" element={<Career />} />
              <Route path="choice" element={<Choice />} />
              <Route path="/team" element={<Team />} />
              <Route path="/terms" element={<Terms />} />
              <Route
                path="/preview"
                element={
                  <Preview
                    logo={logo}
                    message={message}
                    issuedBy={issuedBy}
                    issueDate={issueDate}
                    awardeeName={awardeeName}
                    certificateTitle={certificateTitle}
                  />
                }
              />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/bulk_step" element={<BulkStep />} />
              <Route path="/edit_bulk" element={<EditBulk />} />
              <Route path="/bulk_preview" element={
                <AppProvider>
                  <BulkPreview />
                </AppProvider>
              } />
              <Route
                path="/pricing"
                element={<Pricing access={access} setAccess={setAccess} />}
              />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/payment" element={<Checkout />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/upload"
                element={
                  <AppProvider>
                    <UploadCSV />
                  </AppProvider>
                }
              />
              <Route path="/privacy" element={<Privacy />} />
              {/* ResetPassword */}
              <Route path="/fff5" element={<PasswordChangeSuccessfully />} />
              <Route
                path="/changepassword/:userId/:token"
                element={<ResetPassword />}
              />
              <Route path="/fff3" element={<ChangePassword />} />
              <Route path="/fff2" element={<PasswordLinkSent />} />
              <Route path="/fff1" element={<ForgotPassword />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default Sentry.withProfiler(App);
