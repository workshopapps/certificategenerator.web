import React from "react";
import { Link } from "react-router-dom";
import "./singlepreview.style.scss";
import certificate from "../../assets/images/SinglePreview/Completion - Portrait (2).png";
import certificate2 from "../../assets/images/SinglePreview/Completion - Portrait (3).png";
import certificate3 from "../../assets/images/SinglePreview/Completion - Portrait.png";

function Index({
  logo,
  certificateTitle,
  awardeeName,
  message,
  issuedBy,
  issueDate,
}) {
  return (
    <div id="singlePreview">
      {/* BUTTONS TO TOGGLE BETWEEN SINGLE AND BULK CERTIFICATE */}

      <div className="button-container">
        <Link to="/">
          <button className="active">Single Certificate</button>
        </Link>
        <Link to="/edit_bulk">
          <button className="not-active">Bulk Certificate</button>
        </Link>
      </div>

      {/* IMAGE OF YOUR CERTIFICATE READY TO BE DOWNLOADED OR SENT */}

      <div className="certificate-header">
        <h4>Your certificate is ready!</h4>
      </div>

      <section id="container-wrapper">
        <div id="container-design">
          <div className="sample3"></div>
          <div className="sample"></div>

          <div id="single-preview-card">
            <div id="single-preview-text">
              <div id="preview-text">
                <img src={logo} alt="" />
                <h1>{certificateTitle}</h1>
                
                <p>THIS CERTIFIES THAT</p>
                <h2>{awardeeName}</h2>
                <h6>{message}</h6>
              </div>

              <div className="single-preview-issue">
                <div className="issue-by">
                  <h6>{issuedBy}</h6>
                  <div className="line"></div>
                  <p>ISSUED BY</p>
                </div>

                <div className="issue-by">
                  <h6>{issueDate}</h6>
                  <div className="line"></div>
                  <p>ISSUE DATE</p>
                </div>
              </div>
            </div>
          </div>
          <div className="sample2"></div>
        </div>
      </section>

      <div className="certificate-share-hero">
        {/* BUTTONS FOR EITHER SENDIMG OR DOWNLOADING */}

        <div className="buttons">
          <button className="send-button">Send Certificate</button>
          <button className="download-button">Download Certificate</button>
        </div>
      </div>

      {/* OTHER TEMPLATES TO CHOOSE FROM */}

      <h2>Even More Templates for you</h2>
      <div className="single-images">
        <img src={certificate} alt="templates" />
        <img src={certificate2} alt="templates" />
        <img src={certificate3} alt="templates" />
      </div>

      {/* BUTTON TO EXPLORE MORE TEMPLATES */}
      <button className="explore-button">Explore More Templates</button>
    </div>
  );
}

export default Index;

