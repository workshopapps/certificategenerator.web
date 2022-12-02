import React, { useState } from "react";
import './certificate.style.scss'
import {Link, useNavigate} from "react-router-dom"
import UploadCSV from "../../UploadCSV";
import Button from "../../../Component/button";


export default function Certificate ({
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
    const navigate = useNavigate()
    const disabledButton = !logo.trim() || !message.trim() || !certificateTitle.trim() || !awardeeName.trim() || !issuedBy.trim() || !issueDate.trim()
    const handleSubmit = (e) => {
      e.preventDefault()
      navigate('/preview')
    }
    
    return (
        <>
          <p id="certificatee" className="sora header">
            Create your <span className="emphasized">certificate </span> 
            with <span className="emphasized">ease</span>
          </p>

  function filevalidation() {
    const fi = document.querySelector(".custom-file-input");
    // Check if any file is selected.
    console.log(fi.files);
    if (fi.files.length > 0) {
      for (const i = 0; i <= fi.files.length - 1; i++) {
        const fsize = fi.files.item(i).size;
        const file = Math.round(fsize / 1024);
        // The size of the file.
        // if (file >= 4096) {
        //   alert("File too Big, please select a file less than 4mb");
        // } else if (file < 2048) {
        //   alert("File too small, please select a file greater than 2mb");
        // } else {
        //   document.querySelector("#file-size").textContent =
        //     "<b>" + file + "</b> KB";
        //   }
        document.querySelector("#file-size").textContent = `${file}KB`
      }
    }
  }

  return (
    <>
      <p id="certificatee" className="sora header">
        Create your <span>certificate </span>
        with <span>ease</span>
      </p>

      {bulkCertificate ? (
        <div className="flex justify-between mode">
          <button
            className="select"
            style={{
              color: "#19A68E",
              backgroundColor: "#ffffff",
              transition: "250ms ease-in"
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
              color: "#19A68E",
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
            <div className="file-input">
              <span className="upload-file">
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
                  title=" "
                  // onChange={e =>
                  //   setLogo(URL.createObjectURL(e.target.files[0]))
                  // }
                  onChange={filevalidation}
                />
              </span>
              {/* <label for="img">Upload Logo</label> */}

              {/* <img style={{ width: "15%" }} src={logo} alt="logo" /> */}
              <p style={{ fontSize: "12px", margin: "0" }}>
                Max image upload size: <span id="file-size"></span>
              </p>
            </div>
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
              required
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="For your exceptional performance this month."
            />

            <label htmlFor="text" className="label">
              Issued by
            </label>
            <input
              id={"issuedBy"}
              label={" Issued by"}
              type="text"
              placeholder={"Name of organisation or issuer"}
              value={issuedBy}
              callback={e => setIssuedBy(e.target.value)}
            />

            <label htmlFor="date" className="label">
              Issue Date
            </label>
            <input
              type="date"
              value={issueDate}
              className="date_"
              callback={e => setIssueDate(e.target.value)}
            />

            <Link
              className="btn-create isDisabled certi "
              style={{ marginTop: "50px", cursor: `${"not-allowed"}` }}
              to="/preview"
            >
              <Button
                disabled={disabledButton}
                name={"Create Certificate"}
                className={`certi ${
                  disabledButton && "btn-disabled"
                } btn-success isDisabled`}
              />
            </Link>
          </form>
        </div>
      )
    </>
  );
}
