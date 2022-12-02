import React from "react";
import { Link } from "react-router-dom";
import certificate from "../../assets/images/bulkPreview/Completion - Portrait (2).png";
import "./bulk.style.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Button from "../../Component/button";

function Index() {
  return (
    <div id="bulk-preview">
      {/* YOUR BULK CRETIFICATES READY TO BE DOWNLOADED OR SENT */}

      <div className="certificate">
        <h1>Your certificates are ready!</h1>
        <img src={certificate} alt="certificate" />
      </div>

      {/* PREVIEW OF BULK GENERATED CERTIFICATES  */}

      <h2>Preview of Generated Certificates</h2>

      <section id="bulk-images-desktop">
        <Splide
          options={{
            rewind: true,
            gap: "10px",
            perPage: 4,
            drag: "free",
            arrows: true,
            pagination: true,
            breakpoints: {
              480: {
                perPage: 1
              },
              640: {
                perPage: 2
              },
              768: {
                perPage: 3
              }
            }
          }}
        >
          <SplideSlide>
            <img id="template1" src={certificate} alt="certificates" />
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
          </SplideSlide>
          <SplideSlide>
            <img src={certificate} alt="certificates" />
          </SplideSlide>
        </Splide>
      </section>

      {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}

      <div id="bulk-btns">
        <Button className="">Download Certificates</Button>
        <Button className="btnLight">Send Certificates</Button>
      </div>
    </div>
  );
}

export default Index;
