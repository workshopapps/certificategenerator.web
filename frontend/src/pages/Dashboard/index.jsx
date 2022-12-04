import React, { useEffect, useState } from "react";
import "./dashboard.style.scss";
import profilePic from "../../assets/images/Ellipse4.png";
import Card from "./Card";
import { dummyData, nullDataIcon, actionIcon, tableData } from "./utils";
import Button from "../../Component/button";
import CreateCertificateModal from "./CreateCertificateModal";
import { axiosPrivate } from "../../api/axios";
import useAppProvider from "../../hooks/useAppProvider";
import Swal from "sweetalert2";
import { Loader } from "../../Component";

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
  const [cardData, setCardData] = useState([...dummyData]);
  const [issuedCertCount, setIssuedCertCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(0);
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

  const handleDropdown = (e,itm, index) => {
    // setSelectedIndex(e.target.id);
    // console.log(e.target.id);
    if(index === tableData.indexOf(itm)) setOpenDropdown(!openDropdown);
  };
  useEffect(() => {
    const getUserCertificates = async () => {
      try {
        // setLoading(true);
        const res = await axiosPrivate.get("/certificates");
        // console.log("i got here");
        console.log(res);
        if (res.status === 404) {
          setLoading(false);
          Toast.fire({
            icon: "error",
            title: "Page not found"
          });
        } else if (res.status === 401) {
          setLoading(false);
          Toast.fire({
            icon: "error",
            title: "Request Failed"
          });
        } else if (res.status === 500) {
          setLoading(false);
          Toast.fire({
            icon: "error",
            title: "Internal Server Error"
          });
        } else {
          setData(res.data);
          console.log(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    const getIssuedCertificates = async () => {
      try {
        const res = await axiosPrivate.get("/certificates/issuedCertificates");
        // console.log("i got here");
        console.log(res);
        setIssuedCertCount(res.data);
        setCardData(
          cardData.map(item =>
            item.title === "Total Number Issued"
              ? { ...item, count: res.data.issuedCertificates }
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

  useEffect(() => {
    const updateCount = () => {
      const cardSnapshot = [...cardData];
      const pendingCount = data.filter(
        item => item.status === "pending"
      ).length;
      const newCard = cardSnapshot.map(item =>
        item.title === "Total number of pending certificates"
          ? { ...item, count: pendingCount }
          : item
      );
      setCardData(newCard);
    };
    updateCount();
  }, [data]);

  const dataCheck = cardData.filter(item => item.count !== 0);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh"
        }}
      >
        <Loader />
      </div>
    );
  }
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
            </div>
            <div className="dashboard__btn">
              <button>Upgrade Account</button>
            </div>
          </div>
        </div>

        <div className="dashboard__cards">
          {cardData.length > 0 &&
            cardData.map((item, idx) => <Card key={idx} item={item} />)}
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <p>CERTIFICATE DASHBOARD</p>
            {data.length > 0 ? (
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
                  {tableData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.nameoforganization}</td>
                      {item.status === "issued" ? (
                        <td>
                          <button className="cancel">canceled</button>
                        </td>
                      ) : item.status === "pending" ? (
                        <td>
                          <button className="pending">Pending</button>
                        </td>
                      ) : (
                        <td>
                          <button className="issue">Issued</button>
                        </td>
                      )}
                      <td>{item.date}</td>
                      <td>{data.length}</td>
                      <td>PDF</td>
                      <td className="action">
                        {/* <span>{actionIcon()}</span> */}
                        <svg
                          id={idx} onClick={(e) => handleDropdown(item, idx)}
                          width="6"
                          height="17"
                          viewBox="0 0 6 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.33398 14.3333C1.33398 15.25 2.08398 16 3.00065 16C3.91732 16 4.66732 15.25 4.66732 14.3333C4.66732 13.4167 3.91732 12.6667 3.00065 12.6667C2.08398 12.6667 1.33398 13.4167 1.33398 14.3333ZM1.33398 2.66667C1.33398 3.58333 2.08398 4.33333 3.00065 4.33333C3.91732 4.33333 4.66732 3.58333 4.66732 2.66667C4.66732 1.75 3.91732 1 3.00065 1C2.08398 1 1.33398 1.75 1.33398 2.66667ZM1.33398 8.5C1.33398 9.41667 2.08398 10.1667 3.00065 10.1667C3.91732 10.1667 4.66732 9.41667 4.66732 8.5C4.66732 7.58333 3.91732 6.83333 3.00065 6.83333C2.08398 6.83333 1.33398 7.58333 1.33398 8.5Z"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                        </svg>
                        {openDropdown  && (
                          <div id={idx} className="dropdown">
                            <ul>
                              <li>View</li>
                              <li>Edit</li>
                              <li>Update Status</li>
                              <li>Delete</li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
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
