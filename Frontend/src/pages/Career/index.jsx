import React from "react";
import "./career.style.scss";
import { Persons} from "./data";
import SectionCarousel from "./Carousel";
import SectionPositions from "./openPositions";
import Button from "../../Component/button";
import Rocket from "./assets/rocket-launcher.webp";
import Frame from "./assets/Frame 16353.png";
import Briefcase from "./assets/candidate resumes and briefcase.png";


function Career() {
  return (
    <div className="career__container">
      <div className="section hero__section flex items-center justify-between">
        <div className="hero__content">
          <h2>
            Accelerate your career, make impact, and fulfill your dream with us
          </h2>
          <p>
            Join our amazing team as we make magic happen for businesses that
            are strivining to make magic happen for their teams.
          </p>
          <a href="#positions">
            <Button name="See open positions" />
          </a>
        </div>
        <div className="hero__image">
          <img src={Rocket} alt="rocket" />
        </div>
      </div>

      <section className="section section1">
        <h2>Working at CERTIFY</h2>

        <div className="flex__wrapper">
          <div className="desktop__image">
            <img src={Frame} alt="frame"/>
          </div>
          <div className="team">
            {Persons.map((person) => {
              return <img key={person.id} src={person.img} alt="" />;
            })}
          </div>
          <div className="text__container">
            <h2>
              We move <b>fast</b>, we shoot <b>sharp</b>
            </h2>
            <p>
              Join our amazing team as we make magic happen for businesses that
              are strivining to make magic happen for their teams.
            </p>
            <Button name="See careers" />
          </div>
        </div>
      </section>
      
      <SectionCarousel />

      <section className="section section3">
        <h2 id='heading-text'>Our Hiring Process</h2>
        <div className="flex__wrapper">
          <div className="image__container">
            <img src={Briefcase} alt="" />
          </div>
          <div className="text__container">
            <h2>
              Our staff are the geese and our products are the golden eggs
            </h2>
            <p>
              Because we understand that the success of our team rests solely on
              our staff, we pride ourselves in making our hiring process as
              short and smooth as possible. We take away all forms of anxiety by
              making our process as transparent as possible. We are very clear
              about expection and rewards for contribution. We don’t leave you
              guessing.
            </p>
            <a href="#positions">
              <Button name="See careers" />
            </a>
          </div>
        </div>
      </section>

      <SectionPositions Button={Button}/>
    </div>
  );
}

export default Career;
