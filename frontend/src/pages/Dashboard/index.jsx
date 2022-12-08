import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Card from "./Card";
import { dummyData, nullDataIcon, } from "./utils";
import {Toast} from '../../Component/ToastAlert'
import Button from "../../Component/button";
import CreateCertificateModal from "./CreateCertificateModal";
import useAppProvider from "../../hooks/useAppProvider";
import { Loader } from "../../Component";
import TableRow from "./TableRow";
import profilePic from "../../assets/images/Ellipse4.png";
import Upload from "./assets/upload.png";
import "./dashboard.style.scss";

const Dashboard = () => {
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
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState([...dummyData]);
  const [openModal, setOpenModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [eventLink, setEventLink] = useState("");
  const baseURL = "https://certgo.hng.tech/api";
  const accessToken = JSON.parse(localStorage.getItem("userData")).token
  const [selectedImage, setSelectedImage] = useState('')


  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });


    // On file select (from the pop up)
  // Update the state
    const onFileChange = async (e) => {   
        e.preventDefault()
          setSelectedImage({ file: e.target.files[0] });
          setSelectedImage(URL.createObjectURL(e.target.files[0]))
          console.log(e.target.files[0]);
         const formData = new FormData();
         formData.append('file', selectedImage)
  
  }


  const handleChangeCertificateStatus = async (id, status) => {
    console.log(id, status);
    await axiosPrivate.patch(`/certificates/status/${id}`, { status });
    Toast.fire({
      icon: "success",
      title: "Successfully updated"
    });
    const res = await axiosPrivate.get("/certificates");
    setData(res.data.data.certificates);
  };

  const handleDeleteCertificate = async id => {
    console.log(id);
    await axiosPrivate.delete(`/certificates/${id}`);
    Toast.fire({
      icon: "success",
      title: "Successfully deleted"
    });
    const res = await axiosPrivate.get("/certificates");
    setData(res.data.data.certificates);
  };

  const getUserCertificates = async () => {
    try {
      const response = await axiosPrivate.get("/certificates");
      let sub = JSON.parse(localStorage.getItem("userData")).subscription;
      setPricing(sub);
      console.log(response);
      if (response.status === 404) {
        Toast.fire({
          icon: "error",
          title: "Page not found"
        });
      } else if (response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "Request Failed"
        });
      } else if (response.status === 500) {
        Toast.fire({
          icon: "error",
          title: "Internal Server Error"
        });
      } else {
        setData(response.data.data.certificates);
        console.log(response.data.data.certificates);
        updateCount(response.data.data.certificates);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateCount = param => {
    const cardSnapshot = [...cardData];
    const pendingCount = param.filter(item => item.status === "pending").length;

    const issuedCount = param.filter(item => item.status === "issued").length;

    const allCertCount = param.length;
    const newCard = cardSnapshot.map(item =>
      item.title === "Total Certificates"
        ? { ...item, count: allCertCount }
        : item
    );

    const pendingCard = newCard.map(item =>
      item.title === "Total Pending Certificates"
        ? { ...item, count: pendingCount }
        : item
    );

    const issuedCard = pendingCard.map(item =>
      item.title === "Total Issued Certificates"
        ? { ...item, count: issuedCount }
        : item
    );

    setCardData(issuedCard);
  };

  useEffect(() => {
    getUserCertificates();
  }, []);

  //GET EVENTS
  const getEvents = async () => {
    return fetch("https://certgo.hng.tech/api/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then(async response => {
      const result = await response.json();
      console.log(result.events[1]);
      var link = result.events[0]._id;
      setEventLink(`https://certgo.hng.tech/generate/:${link}`);
    });
  };

  //GENERATE LINK
  const title = "Fela Music School";
  var token = localStorage.getItem("token");
  const handleGenerate = async () => {
    fetch("https://certgo.hng.tech/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: title })
    }).then(async response => {
      const result = await response.json();

      localStorage.setItem("_id", result.event._id);
      localStorage.setItem("eventTitle", result.event.title);
      localStorage.setItem("eventCustomURI", result.event.customURI);
    });
    getEvents();
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__hero-section">
           <div className="dashboard__profile-pic-wrapper">
            <span className="dashboard__profile-pic">
              <img src={selectedImage || profilePic} alt="brand-kit" />   
            </span>
              <label htmlFor="file" className="dashboard__upload-label">
                   <img src={Upload} alt="upload-icon" />
                   <input type="file" id="file" accept="image/*" name="image" onChange={onFileChange}  />
            </label>
          </div>
          <div className="flexx">
            <div className="dashboard__align-start">
              <h3 className="dashboard__text">Welcome</h3>
              <h2 className="dashboard__title">Team Headlight</h2>
              <p className="dashboard__description">
                Let’s do the Accounts for you, Get a summary of all the
                Certificates and Job done here
              </p>
              <div>
                <p>Pricing Plan: {pricing}</p>
              </div>
            </div>
            <div className="dashboard__btn">
              <button>Upgrade Account</button>
            </div>
          </div>
        </div>

        <div className="dashboard__cards">
          {console.log(cardData)}
          {cardData
            ? cardData.map((item, idx) => <Card key={idx} item={item} />)
            : null}
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <p>CERTIFICATE DASHBOARD</p>
            <h5 style={{ padding: "50px!important" }}>
              Certificate Download Link : {eventLink}
            </h5>
            {data.length > 0 ? (
              <div style={{ display: "flex" }}>
                <Button className="" onClick={() => setOpenModal(true)}>
                  Create New Certificate
                </Button>

                <Button
                  style={{ marginLeft: "20px" }}
                  className=""
                  onClick={handleGenerate}
                >
                  {/* <Link to = {`/generate/:${generateId}`}>Generate Link</Link> */}
                  Generate Link
                </Button>
              </div>
            ) : null}
          </div>
          <CreateCertificateModal
            open={openModal}
            onClose={() => setOpenModal(false)}
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
            getUserCertificates={getUserCertificates}
          />
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>CERTIFICATE NAMES</th>
                  <th>STATUS</th>
                  <th>DATE ISSUED</th>
                  {/* <th>NO OF CERTIFICATES</th>
                  <th>FILE TYPE</th> */}
                  <th className="action">ACTION</th>
                </tr>
              </thead>
              {data.length > 0 && (
                <tbody>
                  {data.map((item, idx) => (
                    <TableRow
                      item={item}
                      key={idx}
                      handleChangeCertificateStatus={
                        handleChangeCertificateStatus
                      }
                      handleDeleteCertificate={handleDeleteCertificate}
                      getUserCertificates={getUserCertificates}
                    />
                  ))}
                </tbody>
              )}
            </table>

            {data.length === 0 && (
              <div className="null-table-data">
                <div>
                  {nullDataIcon()}
                  <p>You haven't created any Certificates</p>
                  <div>
                    <button className="" onClick={() => setOpenModal(true)}>
                      Create New Certificate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
