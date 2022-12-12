import React from "react";
import {useRef} from 'react';

import "./hero.style.scss";
import Button from "../../../Component/button";
import hero from "../../../assets/images/hero.png";
import tick from "../../../assets/images/tick.png";

export default function Hero() {
  
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      <div className="center justify-between hero">
        <div className="hero-left">
          <p className="hero-text sora">
            {/* <span className="emphasized hero-title">Certgo</span> -  */}
            Create and Download
            <span className="emphasized"> Free Online Certificates</span>
          </p>
          <p className="work-sans line-height hero-caption">
            {/* Generate professionally designed certificates for your staff,
            students etc. */}
            Create any type of certificate using our free online
            certificate maker. No sign ups are required. Create, share and
            download amazing single or bulk certificates within split seconds
            and in any format of your choice.
          </p>
          {/* <a href="#certificatee"> */}
          <Button onClick={handleClick} name={"Create certificate"} />
          {/* </a> */}
          {/* <button className="hero-button">Create a certificate now</button> */}
          <p className="mobile-only">It is free and easy to use</p>
        </div>
        <div className="hero-right">
          <img src={hero} alt="hero" className="hero-img"></img>
        </div>
      </div>

      <div className="line-height text-left work-sans perks">
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
          <div ref={ref}></div>
        </div>
      </div>
    </>
  );
}

