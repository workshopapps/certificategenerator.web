import React from "react";
import "./dashboard.style.scss";
import profilePic from "./assets/Ellipse3.jpg";
import Card from "./Card";
import {actionIcon, tableData, cardData, nullDataIcon} from "./utils"

const Dashboard = () => {
  

  const dataCheck = cardData.filter(item => item.count !== 0)
  
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
              <h1 className="dashboard__title">Team Headlight</h1>
              <p className="dashboard__description">
                Let’s do the Accounts for you,Get a summary of all the
                Certificates and Job done her
              </p>
            </div>
            <div className="dashboard__btn">
              <button>Upgrade Account</button>
            </div>
          </div>
        </div>

        <div className="dashboard__cards">
          {cardData.map((item, idx) => (
            <Card key={idx} item={item} />
          ))}
        </div>

        <div className="table-wrapper">
          <div className='table-header'>
            <p>CERTIFICATE DASHBOARD</p>
            {dataCheck.length > 0 ? (
              <div>
                <button className="">Create New Certificate</button>
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
                  <th>NO OF CERTIFICATES</th>
                  <th>FILE TYPE</th>
                  <th className="action">ACTION</th>
                </tr>
              </thead>
              {dataCheck.length > 0 && (
                <tbody>
                  {tableData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.certificateName}</td>
                      {item.status === "Issued" ? (
                        <td>
                          <button className="issue">Issued</button>
                        </td>
                      ) : item.status === "Pending" ? (
                        <td>
                          <button className="pending">Pending</button>
                        </td>
                      ) : (
                        <td>
                          <button className="cancel">Canceled</button>
                        </td>
                      )}
                      <td>{item.dateIssued}</td>
                      <td>{item.noOfCerticicate}</td>
                      <td>{item.fileType}</td>
                      <td className="action">{actionIcon()}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {dataCheck.length === 0 && <div className="null-table-data">
              <div>
                {nullDataIcon()}
                <p>You haven't created any Certificates</p>
                <div>
                  <button className="">Create New Certificate</button>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
