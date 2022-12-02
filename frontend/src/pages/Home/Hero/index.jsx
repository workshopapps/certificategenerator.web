import React from "react";
import "./hero.style.scss";
import hero from "../../../assets/images/hero.png";
import tick from "../../../assets/images/tick.png";
import Button from "../../../Component/button";
// import {Link} from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="center justify-between hero">
        <div className="hero-left">
          <p className="hero-text sora">
            Create and download your{" "}
            <span className="emphasized">professional certificates</span> for
            <span className="emphasized"> free</span>
          </p>
          <p className="work-sans line-height hero-caption">
            Generate professionally designed certificates for your staff,
            students etc.
          </p>
          <a href="#certificatee">
            <Button name={"Create Certificate"} />
          </a>
          {/* <button className="hero-button">Create a certificate now</button> */}
          <p className="mobile-only">It is free and easy to use</p>
        </div>
        <div className="hero-right">
          <img src={hero} alt="hero" className="hero-img"></img>
        </div>
      </div>

      <div className="line-height flex justify-between text-left work-sans perks">
        <div className="flex single-perk" style={{ gap: "10px" }}>
          <img src={tick} alt="tick" className="tick"></img>
          <p>
            No design skill needed. Choose from a variety of stunning templates.
          </p>
        </div>
        <div className="flex single-perk" style={{ gap: "10px" }}>
          <img src={tick} alt="tick" className="tick"></img>
          <p>Edit template to your preferred look and feel.</p>
        </div>
        <div className="flex single-perk" style={{ gap: "10px" }}>
          <img src={tick} alt="tick" className="tick"></img>
          <p>Create and Send single and bulk certificate.</p>
        </div>
      </div>
    </>
  );
}
