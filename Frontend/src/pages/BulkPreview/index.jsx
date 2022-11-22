import React from "react";
import { Link } from "react-router-dom";
import certificate from "./images/Completion - Portrait (2).png";
import "./bulk.style.scss";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';



function Index() {
  return (
    <div id="bulk-preview">
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
        <img id="template1" src={certificate} alt="templates" />
        <img src={certificate} alt="templates" />
        <img src={certificate} alt="templates" />
      </div>

     


<section id ="bulk-images-desktop">
<Splide
      options={ {
        
        rewind: true,
        gap   : '10px',
        perPage:4,
        drag:'free',
        arrows:false,
        pagination:false,
      } }
      aria-label="My Favorite Images"
    >
      <SplideSlide>
        <img  id ="template1" src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
      <SplideSlide>
        <img src={certificate} alt="certificates"/>
      </SplideSlide>
    </Splide>
</section>

<div className="line">
  <div className="line1"><div className="line2"></div></div>
</div>

 {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}

 <div id="bulk-btns">
        <button className="download-btn">Download Certificates</button>
        <button className="send-btn">Send Certificates</button>
      </div>
    </div>
  );
}

export default Index;
