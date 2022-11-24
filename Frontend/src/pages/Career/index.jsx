import React from "react";
import "./career.style.scss";
import { Persons, Positions, Positions2 } from "./data";
import SectionCarousel from "./Carousel";
import Button from "../../Component/button";
import Rocket from "./assets/rocket-launcher.webp";
import Frame from "./assets/Frame 16353.png";
import Briefcase from "./assets/candidate resumes and briefcase.png";
import Search from "./assets/search-icon.svg";



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
              We recruit and retain the best people, creatin creating opportunities 
              for early career and more experienced hires. Opportunities with us 
              include internships - the Certify Management Development Programe and 
              experience hiring.
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

      <section id="positions" className="section4">
        <h2>Open Positions</h2>
        <form>
          <div className="search__wrapper">
            <div className="input__div">
              <img src={Search} alt="search-icon" />
              <input
                placeholder="Search for job openings here "
                className="input"
              />
            </div>
            <Button name="Search" />
          </div>
          <div className="options">
            <select>
              <option value="Job Category">Job Category</option>
            </select>
            <select>
              <option value="Full/Part-time">Full/Part-time</option>
            </select>
            <select>
              <option value="Location">Location</option>
            </select>
          </div>
        </form>

        <div className="jobs">
          <div className="job__type">
            <h3>Engineering</h3>
            <span className="number__badge">3</span>
          </div>
          {Positions.map((position) => {
            return (
              <div key={position.id} className="job__cont">
                <div className="job__desc">
                  <div>
                    <h3>{position.role}</h3>
                    <h4>
                      {position.type} | <b>{position.location}</b>
                    </h4>
                  </div>
                  <Button name="Apply" />
                </div>
                <hr />
              </div>
            );
          })}
          <div className="job__type">
            <h3>Customer Success</h3>
            <span className="number__badge">2</span>
          </div>
          {Positions2.map((position, index) => {
            return index < 2 ? (
              <div key={position.id} className="job__cont">
                <div className="job__desc">
                  <div>
                    <h3>{position.role}</h3>
                    <h4>
                      {position.type} | <b>{position.location}</b>
                    </h4>
                  </div>
                  <Button name="Apply" />
                </div>
                <hr />
              </div>
            ) : null;
          })}
        </div>
      </section>
    </div>
  );
}

export default Career;
