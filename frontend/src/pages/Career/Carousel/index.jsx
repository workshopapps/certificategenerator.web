import React, { useState } from "react";
import "./carousel.style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";
import { carouseltems } from "../data";

function SectionCarousel() {
  const [currentImageIndex, setcurrentImageIndex] = useState(0);

  const next = e => {
    e.preventDefault();
    if (currentImageIndex >= 0) {
      setcurrentImageIndex(currentImageIndex - 1);
    } else {
      setcurrentImageIndex(currentImageIndex + 1);
    }
  };
  const prev = e => {
    e.preventDefault();
    if (currentImageIndex >= 1) {
      setcurrentImageIndex(currentImageIndex - 1);
    } else {
      setcurrentImageIndex(currentImageIndex + 1);
    }
  };
  // const { currentImageIndex } = state;
  return (
    <div>
      <section className="section2">
        <Carousel
          selectedItem={currentImageIndex}
          onChange={() => setcurrentImageIndex(currentImageIndex)}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          showArrows={false}
          infiniteLoop={true}
          transitionTime={200}
          useKeyboardArrows
        >
          {carouseltems.map((item, index) => {
            const { heading, body, image, name, role } = item;
            return (
              <div key={index} className="flex__wrapper">
                <div id="arrow">
                  <span className="arrow" onClick={prev}>
                    <img src={ArrowLeft} alt="arrow-left" />
                  </span>
                  <span onClick={next} className="arrow">
                    <img src={ArrowRight} alt="arrow-right" />
                  </span>
                </div>
                <div className="image__container">
                  <img src={image} alt="design-lead" />
                </div>
                <div className="text__container">
                  <h2>{heading}</h2>
                  <p>{body}</p>
                  <h4>{name}</h4>
                  <h5>{role}</h5>
                </div>
              </div>
            );
          })}
        </Carousel>
      </section>
    </div>
  );
}

export default SectionCarousel;
