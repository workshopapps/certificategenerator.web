import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Card from "./Card";
import "./dashboard.style.scss";
import TableRow from "./TableRow";
import { baseURL } from "../../api/axios";
import Button from "../../Component/button";
import DeleteAllModal from "./DeleteAllModal";
import { dummyData, nullDataIcon } from "./utils";
import { Toast } from "../../Component/ToastAlert";
import useAppProvider from "../../hooks/useAppProvider";
import CreateCertificateModal from "./CreateCertificateModal";
import profilePic from "../../assets/svgs/default-brandkit.svg";
import UploadVector from "../../assets/images/uploadPage/uploadVector.svg";

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
  const [openDeleteAllModal, setOpenDeleteAllModal] = useState(false);
  const [pricing, setPricing] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("userData")).token;
  const [file, setFile] = useState("");
  let navigate = useNavigate();
  let sub = JSON.parse(localStorage.getItem("userData")).subscription;
  let unauthArray;
  if (localStorage.getItem("unauthData")) {
    unauthArray = JSON.parse(localStorage.getItem("unauthData"));
  }
  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  const axiosPrivateKit = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  // On file select (from the pop up)
  // Update the state
  const onUpdate = async image => {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await axiosPrivateKit.put("/users/brand-kit", formData);
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
        setFile(response.data.brandkit);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const onFileChange = async e => {
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
    onUpdate(e.target.files[0]);
  };

  useEffect(() => {
    const getFile = async e => {
      const res = await axiosPrivate.get("/users/brand-kit");
      setFile(res.data.brandkit);
    };
    getFile();
  }, []);

  const handleChangeCertificateStatus = async (id, status) => {
    try {
      await axiosPrivate.patch(`/certificates/status/${id}`, { status });
      Toast.fire({
        icon: "success",
        title: "Successfully updated"
      });
      const res = await axiosPrivate.get("/certificates");
      setData(res.data.data.certificates);
    } catch (error) {
      console.error(error.message);
      if (error.response.status === 400 || error.response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "Failed Request"
        });
      } else if (error.response.status === 500) {
        Toast.fire({
          icon: "error",
          title: "Internal Server Error"
        });
      }
    }
  };

  const handleDeleteCertificate = async id => {
    await axiosPrivate.delete(`/certificates/${id}`);
    Toast.fire({
      icon: "success",
      title: "Successfully deleted"
    });
    const res = await axiosPrivate.get("/certificates");
    setData(res.data.data.certificates);
  };
  const [loading, setLoading] = useState(false);

  const handleDeleteAllCertificates = async () => {
    await axiosPrivate.delete(`/certificates`);
    Toast.fire({
      icon: "success",
      title: "You have deleted all your certificates"
    });
    setData([]);
    updateCount([]);
  };
  const getUnauthUserCertificates = async () => {
    if (localStorage.getItem("unauthData")) {
      localStorage.removeItem("unauthData");
      await axiosPrivate.post("/certificates", unauthArray);
      const res = await axiosPrivate.get("/certificates");
      let allData = res.data.data.certificates;
      updateCount(allData);
      setData(allData);
    }
  };
  const getUserCertificates = async () => {
    try {
      getUnauthUserCertificates();
      if (localStorage.getItem("unauthData")) return;
      const response = await axiosPrivate.get("/certificates");
      setPricing(sub);

      setData(response.data.data.certificates);
      updateCount(response.data.data.certificates);
    } catch (error) {
      console.error(error.message);
      if (error.response.status === 400 || error.response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "Failed Request"
        });
      } else if (error.response.status === 500) {
        Toast.fire({
          icon: "error",
          title: "Internal Server Error"
        });
      }
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
      item.title === "Pending Certificates"
        ? { ...item, count: pendingCount }
        : item
    );

    const issuedCard = pendingCard.map(item =>
      item.title === "Issued Certificates"
        ? { ...item, count: issuedCount }
        : item
    );
    setCardData(issuedCard);
  };

  useEffect(() => {
    getUserCertificates();
  }, []);

  //DELETE ALL USER CERTIFICATES
  const handleDeleteAll = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleDeleteAllCertificates();
      setOpenDeleteAllModal(false);
    }, 500);
  };

  let id = JSON.parse(localStorage.getItem("userData")).userId;
  const ShortId = id.slice(19, 24);

  useEffect(() => {
    if (sub !== "pricing") {
    }
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__hero-section">
          <div className="dashboard__profile-pic-wrapper">
            <span className="dashboard__profile-pic">
              <img src={file || profilePic} alt="brand-kit" />
            </span>
            <div className="brandkit-upload">
              <label htmlFor="file" className="dashboard__upload-label">
                <img src={UploadVector} alt="upload" />
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  name="file"
                  onChange={onFileChange}
                />
              </label>
            </div>
          </div>
          <div className="flexx">
            <div className="dashboard__align-start">
              <h3 className="dashboard__text">Welcome </h3>
              <h2
                style={{ textTransform: "capitalize" }}
                className="dashboard__title"
              >
                {/* {profileName ? profileName : `user - ${ShortId}`} */}
                { `user - ${ShortId}`}
              </h2>
              <p className="dashboard__description">
                Get a summary of all the Certificates here
              </p>
              <div>
                <p className="dashboard__plan dashboard__bold">
                  Package: <span className="dashboard__bold">{sub}</span>
                </p>
              </div>
            </div>
            <div className="dashboard__btn">
              <button onClick={() => navigate("/pricing")}>
                Upgrade Account
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard__cards">
          {cardData
            ? cardData.map((item, idx) => <Card key={idx} item={item} />)
            : null}
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <p>CERTIFICATES</p>
            {/* <h5 style={{ padding: "50px!important" }}>
              
                Certificate Download Link : {eventLink && <a style = {{color : 'green'}} target = '_blank' href = {eventLink}>Link generated, Click Here</a>}
              
            </h5> */}
            {data.length > 0 ? (
              <div style={{ display: "flex" }}>
                <Button
                  className="new-certificate"
                  style={{ fontSize: "16px" }}
                  onClick={() => setOpenModal(true)}
                >
                  + New Certificate
                </Button>

                <Button
                  style={{
                    fontSize: "16px",
                    backgroundColor: "white",
                    color: "#19a68e"
                  }}
                  onClick={() => setOpenDeleteAllModal(true)}
                >
                  Delete All
                </Button>

                {/*<Button
                  style={{ marginLeft: "16px", fontSize: "16px" }}
                  className="btn-generate"
                  onClick={handleGenerate}
                >
                  <Link to = {`/generate/:${generateId}`}>Generate Link</Link> 
                  Generate Link
                </Button> */}
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
          <DeleteAllModal
            open={openDeleteAllModal}
            onClose={() => setOpenDeleteAllModal(false)}
            logo={logo}
            action={handleDeleteAll}
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
                  <p style={{ fontSize: "16px" }}>
                    You haven't created any Certificates
                  </p>
                  <div>
                    <button className="" onClick={() => setOpenModal(true)}>
                      + New Certificate
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
