import "./header.style.scss";
import frame from "./assests/frame.png";
import image from "../Profile_Header/assests/image.png";
import map from "./assests/map.png";
import React from "react";

const Header = () => {
  return (
    <div className="headerr">
      <div className="framee">
        <img src={frame} />
        <div className="header_profile_iconn">
          <img src={image} />
        </div>
      </div>
      <div className="profile_detailss">
        <div className="namee">
          <h2>Olamposi Benjamin</h2>
        </div>
        <div className="titlee">Advisor and Consultant at Stripe Inc</div>
        <div className="locationn">
          <img src={map} /> <span>Lagos, Nigeria</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
