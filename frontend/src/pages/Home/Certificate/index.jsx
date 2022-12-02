import React, { useState } from "react";on
import "./certificate.style.scss";
import { Link, useNavigate } from "react-router-dom";
import UploadCSV from "../../UploadCSV";
import Button from "../../../Component/button";

export default function Certificate({
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
}) {
  const [bulkCertificate, setBulkCertificate] = useState(false);
  const navigate = useNavigate();
  const disabledButton =
    !logo.trim() ||
    !message.trim() ||
    !certificateTitle.trim() ||
    !awardeeName.trim() ||
    !issuedBy.trim() ||
    !issueDate.trim();
  const handleSubmit = e => {
    e.preventDefault();
    navigate("/single_preview");
  };

  return (
    <>
      <p id="certificatee" className="sora header">
        Create your certificate with ease
      </p>

      <p className="prompt" style={{ margin: 0, color: "#6C6C70" }}>
        Select a template, input values and create a certificate right away.
      </p>

      {bulkCertificate ? (
        <div className="flex justify-between mode">
          <button
            className="select"
            style={{ color: "#19A68E", backgroundColor: "#ffffff" }}
            onClick={() => {
              setBulkCertificate(false);
            }}
          >
            Single <span className="mobile-none">Certificate</span>
          </button>
          <button
            className="select"
            onClick={() => {
              setBulkCertificate(true);
            }}
          >
            Bulk <span className="mobile-none">Certificate</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-between mode">
          <button
            className="select"
            onClick={() => {
              setBulkCertificate(false);
            }}
          >
            Single <span className="mobile-none">Certificate</span>
          </button>
          <button
            className="select"
            style={{ color: "#19A68E", backgroundColor: "#ffffff" }}
            onClick={() => {
              setBulkCertificate(true);
            }}
          >
            Bulk <span className="mobile-none">Certificate</span>
          </button>
        </div>
      )}

      {bulkCertificate ? (
        <div>
          <form action="" className="cert-form text-left work-sans">
            <UploadCSV />
            {/* <label for='img'>Logo</label>
            <input type="file" name="uploadfile" id="img" style={{ display:"none"}}/>
            <label for="img" className="upload">Upload logo</label>
            <p style={{fontSize: '12px', margin: '0'}}>Max image upload size: 8mb</p>

            <label for='text' className="label">Certificate Title</label>
            <input type="text" placeholder="Certificate of completion"/>
        
            <label for='text' className="label">Dedication or message</label>
            <input type="text" placeholder="For your exceptional performance this month, 
            in appreciation for your loyalty and the desire to fulfil our goals, 
            in recognition of your leadership and dedication "/>

            <label for='text' className="label">Issued by</label>
            <input type="text" placeholder="Name of organisation or issuer"/>

            <label for='date' className="label">Issue Date</label>
            <input type="date" />

            <input type="submit" value="Create Certificate" className="submit-btn"/> */}
          </form>
        </div>
      ) : (
        <div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="cert-form text-left work-sans"
          >
            <label for="img">Upload logo</label>
            <input
              type="file"
              name="uploadfile"
              id="img"
              onChange={e => setLogo(URL.createObjectURL(e.target.files[0]))}
            />

            <img style={{ width: "15%" }} src={logo} alt="logo" />
            <p style={{ fontSize: "12px", margin: "0" }}>
              Max image upload size: 8mb
            </p>

            <label htmlFor="text" className="label">
              Certificate Title
            </label>
            <input
              type="text"
              placeholder="Certificate of completion"
              value={certificateTitle}
              onChange={e => setCertificateTitle(e.target.value)}
            />

            <label htmlFor="text" className="label">
              Awardee Name
            </label>
            <input
              type="text"
              placeholder="Gabriel Prosper"
              value={awardeeName}
              onChange={e => setAwardeeName(e.target.value)}
            />

            <label htmlFor="text" className="label">
              Dedication or message
            </label>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="For your exceptional performance this month, 
                in appreciation for your loyalty and the desire to fulfil our goals, 
                in recognition of your leadership and dedication"
            />

            <label htmlFor="text" className="label">
              Issued by
            </label>
            <input
              type="text"
              placeholder="Name of organisation or issuer"
              value={issuedBy}
              onChange={e => setIssuedBy(e.target.value)}
            />

            <label htmlFor="date" className="label">
              Issue Date
            </label>
            <input
              type="text"
              value={issueDate}
              onChange={e => setIssueDate(e.target.value)}
            />

            <button
              disabled={disabledButton}
              className={`${disabledButton && "btn-disabled"} btn-success`}
            >
              Create Certificate
            </button>

            <label htmlFor="date" className="label">
              Issue Date
            </label>
            <input
              type="date"
              value={issueDate}
              onChange={e => setIssueDate(e.target.value)}
            />

            <Link className="btn-create" to="single_preview">
              <Button name={"Create Certificate"} />
            </Link>
          </form>
        </div>
      )}
    </>
  );
}
