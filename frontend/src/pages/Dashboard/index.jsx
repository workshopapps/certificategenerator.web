import React, { useEffect, useState } from "react";
import "./dashboard.style.scss";
import profilePic from "../../assets/images/Ellipse4.png";
import Card from "./Card";
import { cardData, nullDataIcon, actionIcon } from "./utils";
import Button from "../../Component/button";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [issuedCert, setIssuedCert] = useState([...cardData]);

  useEffect(() => {
    const fetchData = () => {
      setIssuedCert(cardData);
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdmOTg3MDQyODc5MzAwNDJmYzE0M2UiLCJpYXQiOjE2NjkzMDY4MjQsImV4cCI6MTY2OTM5MzIyNH0.x5q4XJDcFvN8EWqc4e0el6CZXJtwQjtcrmo3Id0sQlc"
      );

      let requestOptions = {
        method: "GET",
        headers: myHeaders
      };

      fetch("https://certify-api.onrender.com/api/certificates", requestOptions)
        .then(response => response.json())
        .then(result => setData(result))
        .catch(error => console.log("error", error));

      fetch(
        "https://certify-api.onrender.com/api/certificates/issuedCertificates",
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          setIssuedCert(
            issuedCert.map(item =>
              item.title === "Total Number Issued"
                ? { ...item, count: result.issuedCertificates }
                : item
            )
          );
        })
        .catch(error => console.log("error", error));
    };
    fetchData();
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
                <Button className="">Create New Certificate</Button>
              </div>
            ) : null}
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>CERTIFICATE NAMES</th>
                  <th>STATUS</th>
                  <th>DATE ISSUED</th>
                  {/* <th>NO OF CERTIFICATES</th> */}
                  <th>FILE TYPE</th>
                  <th className="action">ACTION</th>
                </tr>
              </thead>
              {data.length > 0 && (
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.nameOfOrganization.toUpperCase()}</td>
                      {item.status === "Issued" ? (
                        <td>
                          <button className="cancel">Canceled</button>
                        </td>
                      ) : item.status === "Pending" ? (
                        <td>
                          <button className="pending">Pending</button>
                        </td>
                      ) : (
                        <td>
                          <button className="issue">Issued</button>
                        </td>
                      )}
                      <td>{item.date}</td>
                      {/* <td>{data.length}</td> */}
                      <td>PDF</td>
                      <td className="action">{actionIcon()}</td>
                    </tr>
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
                    <button className="">Create New Certificate</button>
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
