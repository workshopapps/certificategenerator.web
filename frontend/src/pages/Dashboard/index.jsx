import React, { useEffect, useState } from "react";
import "./dashboard.style.scss";
import profilePic from "../../assets/images/Ellipse4.png";
import Card from "./Card";
import { cardData, nullDataIcon, actionIcon } from "./utils";
import Button from "../../Component/button";
import CreateCertificateModal from "./CreateCertificateModal";
import { axiosPrivate } from "../../api/axios";
import useAppProvider from "../../hooks/useAppProvider";
import Swal from "sweetalert2";
import { Loader } from "../../Component";
import TableRow from "./TableRow";


const Dashboard = ({
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
  const [data, setData] = useState([]);
  const [issuedCert, setIssuedCert] = useState([...cardData]);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(0);
  const [pricing, setPricing] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(tableData);
  const { certificates, setCertificates } = useAppProvider();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  const handleChangeCertificateStatus = async (id, status) => {
    console.log(id, status)
    await axiosPrivate.patch(`/certificates/status/${id}`, status)
    Toast.fire({
      icon: "success",
      title: "Successfully updated"
    });
    const certificates = await axiosPrivate.get('/certificates')
    setData(certificates)

  }
  useEffect(() => {
    setLoading(true);
    const getUserCertificates = async () => {
      try {
        const response = await axiosPrivate.get("/certificates");
        let sub = localStorage.getItem('subscription')
        setPricing(sub)
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
          setData(response.data);
          console.log(response.data);
          setLoading(false)
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    const getIssuedCertificates = async () => {
      try {
        
        const response = await axiosPrivate.get("/certificates/issuedCertificates");
        // console.log("i got here");
        console.log(response);
        setIssuedCertCount(response.data);
        setLoading(false)
        setCardData(
          cardData.map(item =>
            item.title === "Total Number Issued"
              ? { ...item, count: response.data.issuedCertificates }
              : item
          )
        );
      } catch (error) {
        console.error(error);
      }
    };
    
    
    getUserCertificates();
    getIssuedCertificates();
  }, []);

  const dataCheck = issuedCert.filter(item => item.count !== 0);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__hero-section">
          <div className="dashboard__profile-pic">
            <img src={profilePic} alt="Avatar" />
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
                <p>Pricing Plan: {pricing.toUpperCase()}</p>
              </div>
            </div>
            <div className="dashboard__btn">
              <button>Upgrade Account</button>
            </div>
          </div>
        </div>

        <div className="dashboard__cards">
          {issuedCert.map((item, idx) => (
            <Card key={idx} item={item} />
          ))}
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <p>CERTIFICATE DASHBOARD</p>
            {dataCheck.length > 0 ? (
              <div>
                <Button className="" onClick={() => setOpenModal(true)}>
                  Create New Certificate
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
          />
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>CERTIFICATE NAMES</th>
                  <th>STATUS</th>
                  <th>DATE ISSUED</th>
                  <th>NO OF CERTIFICATES</th>
                  <th>FILE TYPE</th>
                  <th className="action">ACTION</th>
                </tr>
              </thead>
              {data.length > 0 && (
                <tbody>
                  {data.map((item, idx) => (
                     <TableRow item={item} key={idx} handleChangeCertificateStatus={handleChangeCertificateStatus} />
                  ))}
                </tbody>
              )}
            </table>

            {dataCheck.length === 0 && (
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
