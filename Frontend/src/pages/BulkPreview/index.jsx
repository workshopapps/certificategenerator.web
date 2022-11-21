import React from "react";
import { Link } from "react-router-dom";
import certificate from "./images/Completion - Portrait (2).png";
import "./bulk.style.scss";

function BulkPreview() {
  return (
    <div id="bulkPreview" className="bulk">
      {/* BUTTONS TO TOGGLE BETWEEN SINGLE AND BULK CERTIFICATE */}

      <div className="button-container">
        <Link to="/single_preview">
          <button className="not-active">Single Certificate</button>
        </Link>
        <button className="active">Bulk Certificate</button>
      </div>

      {/* YOUR BULK CRETIFICATES READY TO BE DOWNLOADED OR SENT */}

      <div className="certificate">
        <h1>Your certificates are ready!</h1>
        <img src={certificate} alt="certificate" />
      </div>

      {/* PREVIEW OF BULK GENERATED CERTIFICATES  */}

      <h2>Preview of Generated Certificates (120 recipents)</h2>
      <div className="bulk-images">
        <img src={certificate} alt="templates" />
        <img src={certificate} alt="templates" />
        <img src={certificate} alt="templates" />
      </div>

      {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}

      <div className="bulk-buttons">
        <button className="download-button">Download Certificates</button>
        <button className="send-button">Send Certificates</button>
      </div>
    </div>
  );
}

export default BulkPreview;
