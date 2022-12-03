import { useState, useEffect } from "react";

import {
  AboutUs,
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
  Preview,
  Team,
  Templates,
  Terms,
  ProfilePage,
  UploadCSV
} from "./pages";
import "./Style/App.scss";
import Home from "./pages/Home";
import { Loader } from "./Component";
import Navbar from "./Component/Navbar";
import Checkout from "./pages/Checkout";
import { Privacy } from "./pages/PrivacyPolicy";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Component/Signup-Login/assets/Sginup";
import Login from "./Component/Signup-Login/assets/Login";

function App() {
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [awardeeName, setAwardeeName] = useState("");
  const [certificateTitle, setCertificateTitle] = useState("");

  const [file, setFile] = useState("");
  const [certificatesData, setCertificateData] = useState([]);

  const [appLoading, setAppLoading] = useState(true);

  const [access, setAccess] = useState();
  useEffect(() => {
    setTimeout(function () {
      setAppLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      let myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdmOTg3MDQyODc5MzAwNDJmYzE0M2UiLCJpYXQiOjE2NjkzMDY4MjQsImV4cCI6MTY2OTM5MzIyNH0.x5q4XJDcFvN8EWqc4e0el6CZXJtwQjtcrmo3Id0sQlc"
      );

      let formdata = new FormData();
      formdata.append("file", file[0]);
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata
      };

      fetch("https://certify-api.onrender.com/api/certificates", requestOptions)
        .then(response => response.json())
        .then(result => setCertificateData(result))
        .catch(error => console.log("error", error));
    };
    file && uploadFile();
  }, [file]);

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
            <Route path="/signup" element={<Signup />} />
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
            <Route
              path="/pricing"
              element={<Pricing access={access} setAccess={setAccess} />}
            />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/upload" element={<UploadCSV setFile={setFile} />} />

            <Route path="/privacy" element={<Privacy />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
   </>
 );
}

export default App;
