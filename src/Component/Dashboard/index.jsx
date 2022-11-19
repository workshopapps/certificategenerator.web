import React from "react";
import "./dashboard.style.scss";
import profilePic from "./assets/Ellipse3.jpg";
import Card from "../Dashboard/Card";

const Dashboard = () => {
  const Icon = () => (
    <svg
      width="6"
      height="17"
      viewBox="0 0 6 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33398 14.3333C1.33398 15.25 2.08398 16 3.00065 16C3.91732 16 4.66732 15.25 4.66732 14.3333C4.66732 13.4167 3.91732 12.6667 3.00065 12.6667C2.08398 12.6667 1.33398 13.4167 1.33398 14.3333ZM1.33398 2.66667C1.33398 3.58333 2.08398 4.33333 3.00065 4.33333C3.91732 4.33333 4.66732 3.58333 4.66732 2.66667C4.66732 1.75 3.91732 1 3.00065 1C2.08398 1 1.33398 1.75 1.33398 2.66667ZM1.33398 8.5C1.33398 9.41667 2.08398 10.1667 3.00065 10.1667C3.91732 10.1667 4.66732 9.41667 4.66732 8.5C4.66732 7.58333 3.91732 6.83333 3.00065 6.83333C2.08398 6.83333 1.33398 7.58333 1.33398 8.5Z"
        stroke="#52877E"
        strokeWidth="1.5"
      />
    </svg>
  );

  const tableData = [
    {
      certificateName: "Hng Internship",
      status: "Issued",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
    {
      certificateName: "Hng Internship",
      status: "Issued",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
    {
      certificateName: "Hng Internship",
      status: "Pending",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
    {
      certificateName: "Hng Internship",
      status: "Issued",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
    {
      certificateName: "Hng Internship",
      status: "Issued",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
    {
      certificateName: "Hng Internship",
      status: "Canceled",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
    {
      certificateName: "Hng Internship",
      status: "Pending",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
    {
      certificateName: "Hng Internship",
      status: "Canceled",
      dateIssued: "14/12/2022",
      noOfCerticicate: 56,
      fileType: "PDF",
    },
  ];

  const cardData = [
    {
      title: "Total Number Issued",
      icon: "",
      count: 1,
    },
    {
      title: "Drafts",
      icon: "",
      count: 0,
    },
    {
      title: "No of Certificates Declined",
      icon: "",
      count: 0,
    },
  ];
  return (
    <>
      <div className="dashboard">
        <div className="dashboard__hero-section">
          <div className="dashboard__profile-pic">
            <img src={profilePic} alt="Avatar" />
          </div>
          <div className="flexx">
            <div>
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
          <div className="table-header">
            <p className="">CERTIFICATE DASHBOARD</p>
            {cardData[0].count !== 0 ||
            cardData[1].count !== 0 ||
            cardData[2].count !== 0 ? (
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
              <tbody>
                {cardData[0].count !== 0 ||
                cardData[1].count !== 0 ||
                cardData[2].count !== 0 ? (
                  <>
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
                        <td className="action">{Icon()}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <div className="null-table-data">
                    <div>
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M50.7282 23.3132V34.8157C50.7282 46.3182 46.1272 50.9192 34.6247 50.9192H20.8218C9.31926 50.9192 4.71826 46.3182 4.71826 34.8157V21.0127C4.71826 9.51018 9.31926 4.90918 20.8218 4.90918H32.3242"
                          stroke="#8DB5AE"
                          stroke-width="2.7606"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M50.7282 23.3132H41.5262C34.6247 23.3132 32.3242 21.0127 32.3242 14.1112V4.90918L50.7282 23.3132Z"
                          stroke="#8DB5AE"
                          stroke-width="2.7606"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                        <p>You haven't created any Certificates</p>
                      <div>
                        <button className="">Create New Certificate</button>
                      </div>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
