import React, { useState } from "react";
import "./certificate.style.scss";
import { Link, useNavigate } from "react-router-dom";
import UploadCSV from "../../UploadCSV";
import Button from "../../../Component/button";
import Input from "../../../Component/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../Loader";

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
  const [date, setDate] = useState(Date.now());
  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  // const disabledButton =
  //   !logo.trim() ||
  //   !message.trim() ||
  //   !certificateTitle.trim() ||
  //   !awardeeName.trim() ||
  //   !issuedBy.trim();
  // !issueDate;
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/preview");
    }, 3000);
  };
  const handleDate = date => {
    setDate(date);
    setIssueDate(formatDate(date));
  };
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join("/");
  }

  function filevalidation() {
    const fi = document.querySelector(".custom-file-input");
    // Check if any file is selected.
    const x = fi.files[0];
    setLogo(fi.files[0]);
    if (fi.files.length > 0) {
      for (let i = 0; i <= fi.files.length - 1; i++) {
        const fsize = fi.files.item(i).size;
        const file = Math.round(fsize / 1024);
        document.querySelector("#file-size").textContent = `${file}KB`;
        document.querySelector(".name-of-file").textContent = `${x.name}`;
      }
    }
  }

  function uploadFileHandler() {
    document.querySelector(".custom-file-input").click();
  }

  function checkIfFieldIsEmpty() {
    const file = document.querySelector(".custom-file-input");
    const certificateTitle = document.querySelector(".certificate-title").value;
    const awardeeName = document.querySelector(".awardee-name").value;
    const message = document.querySelector(".edication-or-message").value;
    const issuedBy = document.querySelector(".issued-by").value;

    if (
      file.files.length > 0 &&
      certificateTitle.trim().length > 0 &&
      awardeeName.trim().length > 0 &&
      message.trim().length > 0 &&
      issuedBy.trim().length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }

  return (
    <>
      <p id="certificatee" className="sora header">
        Create your <span>certificate </span>
        with <span>ease</span>
      </p>

      <p style={{ padding: "10px" }} className="prompt">
        Select a template, input values and Create a Certificate right away.
      </p>

      {bulkCertificate ? (
        <div className="flex justify-between mode">
          <button
            className="select"
            style={{
              color: "#222222",
              backgroundColor: "#ffffff",
              transition: "300ms ease-in"
            }}
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
            style={{
              color: "#222222",
              backgroundColor: "#ffffff",
              transition: "300ms ease-in"
            }}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.1rem"
              }}
              className="file-input"
            >
              <label
                htmlFor="file"
                className="label"
                style={{ marginTop: "0px", marginBottom: "20px" }}
              >
                Logo
              </label>
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="name_upload_container"
              >
                <span className="upload-file" onClick={uploadFileHandler}>
                  Upload Logo
                  <input
                    type="file"
                    name="uploadfile"
                    id="img"
                    className="custom-file-input"
                    style={{
                      width: "inherit",
                      padding: "0px",
                      border: "none",
                      position: "absolute"
                    }}
                    onMouseOver={uploadFileHandler}
                    title=" "
                    // onChange={e =>
                    //   setLogo(URL.createObjectURL(e.target.files[0]))
                    // }
                    onChange={() => {
                      filevalidation();
                      checkIfFieldIsEmpty();
                    }}
                  />
                </span>
                <p className="name-of-file"></p>
              </div>

              <p style={{ fontSize: "12px", margin: "0" }}>
                Image upload size: <span id="file-size"></span>
              </p>
            </div>
            <label htmlFor="text" className="label">
              Certificate Title
            </label>
            <input
              label={"Certificate Title"}
              className="certificate-title"
              type="text"
              placeholder="Certificate of completion"
              value={certificateTitle}
              // onChange={e => setCertificateTitle(e.target.value)}
              onChange={e => {
                setCertificateTitle(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="text" className="label">
              Awardee Name
            </label>
            <input
              label={"Awardee Name"}
              className="awardee-name"
              type="text"
              placeholder="Gabriel Prosper"
              value={awardeeName}
              // onChange={e => setAwardeeName(e.target.value)}
              onChange={e => {
                setAwardeeName(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="text" className="label">
              Dedication or message
            </label>
            <input
              label={"Dedication or message"}
              className="edication-or-message"
              type="text"
              placeholder="For your exceptional performance this month."
              value={message}
              onChange={e => {
                setMessage(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="text" className="label">
              Issued By
            </label>
            <input
              label={"Issued By"}
              className="issued-by"
              type="text"
              placeholder="Name of organisation or issuer"
              value={issuedBy}
              // onChange={e => setIssuedBy(e.target.value)}
              onChange={e => {
                setIssuedBy(e.target.value);
                checkIfFieldIsEmpty();
              }}
            />

            <label htmlFor="" className="label">
              Issue Date
            </label>
            <DatePicker
              selected={date}
              onChange={handleDate}
              dateFormat="dd/MM/yyyy"
            />

            <button
              disabled={disabledButton}
              className={`${disabledButton && "btn-disabled"} btn-success`}
            >
              {loading ? <Loader /> : <span>Create Certificate</span>}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
