import React from "react";
import "./partners.style.scss";
import google from "../../../assets/images/google.png";
import udemy from "../../../assets/images/udemy.png";
import coursera from "../../../assets/images/coursera.png";
import skillshare from "../../../assets/images/skillshare.png";

const Partners = () => {
  return (
    <div className="partners-containers">
      <p className="partner-head sora">
        Trusted by schools and institutions; big and small
      </p>
      <div className="partners">
        <img
          src={google}
          alt="google"
          style={{ gridArea: "d" }}
          className="bottom google"
        />
        <img
          src={udemy}
          alt="udemy"
          style={{ gridArea: "b" }}
          className="bottom udemy"
        />
        <img
          src={coursera}
          alt="coursera"
          style={{ gridArea: "c" }}
          className="bottom coursera"
        />
        <img
          src={skillshare}
          alt="skillshare"
          style={{ gridArea: "a" }}
          className="bottom skillshare"
        />
        <img
          src={google}
          alt="google"
          style={{ gridArea: "e" }}
          className="google"
        />
        <img
          src={coursera}
          alt="coursera"
          style={{ gridArea: "f" }}
          className="coursera"
        />
        <img
          src={skillshare}
          alt="skillshare"
          style={{ gridArea: "g" }}
          className="skillshare"
        />
      </div>
    </div>
  );
};

export default Partners;
