import React from "react";
import { Link } from "react-router-dom";
import "./singlepreview.style.scss";
//import ".../Style/_variables.scss"

import certificate from "../../assets/images/SinglePreview/Completion - Portrait (2).png"
import certificate2 from "../../assets/images/SinglePreview/Completion - Portrait (3).png"
import certificate3 from "../../assets/images/SinglePreview/Completion - Portrait.png"

function Index() {
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

      <div className="certificate-hero">
        <h1>Your certificate is ready!</h1>
        <img src={certificate} alt="certificate" />

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
