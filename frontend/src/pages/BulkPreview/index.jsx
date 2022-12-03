import React from "react";
import { Link } from "react-router-dom";
import certificate from "../../assets/images/bulkPreview/Completion - Portrait (2).png";
import "./bulk.style.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import BulkCertDesign from "./BulkCertDesign";
import "@splidejs/react-splide/css";
import Button from "../../Component/button";

function Index() {
  return (
    <div id="bulk-preview">
      {/* YOUR BULK CRETIFICATES READY TO BE DOWNLOADED OR SENT */}

      {/* <div className="certificate">
        <h1>Your certificates are ready!</h1>
        <img src={certificate} alt="certificate" />
      </div> */}

      <BulkCertDesign />

      {/* PREVIEW OF BULK GENERATED CERTIFICATES  */}

      <h2>Preview of Generated Certificates</h2>

      <section id="bulk-images-desktop">
        <Splide className="bulk-images-wrapper"
          options={{
            rewind: true,
            gap: "30px",
            perPage: 3,
            drag: "free",
            arrows: true,
            pagination: true,
            breakpoints: {
              640: {
                perPage: 1
              },
              798: {
                perPage: 2
              }
            }
          }}
        >
          <SplideSlide>
            <BulkCertDesign />
          </SplideSlide>
          <SplideSlide>
            <BulkCertDesign />
          </SplideSlide>
          <SplideSlide>
            <BulkCertDesign />
          </SplideSlide>
          <SplideSlide>
            <BulkCertDesign />
          </SplideSlide>
          <SplideSlide>
            <BulkCertDesign />
          </SplideSlide>
          {/* <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide> */}
        </Splide>
      </section>

      {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}

      <div id="bulk-btns">
        <Button  name='Download Certificates' style={{padding: '10px'}}/>
        <Button className="btnLight" name='Send Certificates' style={{padding: '10px'}}/>
      </div>
    </div>
  );
}

export default Index;
