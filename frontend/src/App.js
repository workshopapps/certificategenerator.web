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
  ProfilePage,
  UploadCSV,
} from "./pages";
// import Footer from './Component/Footer';

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import { Privacy } from "./pages/PrivacyPolicy";
import { useState, useEffect } from "react";

function App() {
  const [logo, setLogo] = useState("");
  const [certificateTitle, setCertificateTitle] = useState("");
  const [awardeeName, setAwardeeName] = useState("");
  const [message, setMessage] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const [file, setFile] = useState('')
  const [certificatesData, setCertificateData] = useState([])

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
      body: formdata,
    };

    fetch("https://certify-api.onrender.com/api/certificates", requestOptions)
      .then((response) => response.json())
      .then((result) => setCertificateData(result))
      .catch((error) => console.log("error", error));
    }
    file && uploadFile()
  }, [file]);
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
            <Route path="/bulk_preview" certificatesData={certificatesData} element={<BulkPreview />} />
            <Route path="/bulk_step" element={<BulkStep />} />
            <Route path="/edit_bulk" element={<EditBulk />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/payment" element={<Checkout />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/upload" setFile={setFile} element={<UploadCSV />} />

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
