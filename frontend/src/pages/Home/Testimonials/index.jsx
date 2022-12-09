import React from "react";
import "./testimonials.style.scss";
import person_1 from "../../../assets/images/person-1.png";
import person_2 from "../../../assets/images/person-2.png";
import person_3 from "../../../assets/images/person-3.png";
import person_5 from "../../../assets/images/todd.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Testimonials() {
  return (
    <>
      <div className="testimonial">
        <h1>Testimonials</h1>
        <p>What our users have to say about us</p>

        <Splide
          className="testimonial-wrapper"
          options={{
            gap: "40px",
            perPage: 3,
            breakpoints: {
              1200: {
                perPage: 2
              },
              908: {
                perPage: 1
              }
            },

            arrows: true,
            pagination: true,
            drag: "free"
          }}
        >
          <SplideSlide>
            <div className="testimonial-box test">
              <div className="testimonial-flex">
                <img src={person_1} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Lindsay Favazza</p>
                  <p className="testimonial-state">United States</p>
                </div>
              </div>
              <p className="testimonial-test">
                “This is my first time utilizing Certgo. It is simply brilliant.
                In a matter of seconds, a full certificate is generated”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-box">
              <div className="testimonial-flex">
                <img src={person_2} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Valerie Tan</p>
                  <p className="testimonial-state">Singapore</p>
                </div>
              </div>
              <p className="testimonial-test">
                “The Certgo certificate generator is a fantastic tool that helps
                me create certificates quickly and with plenty of inspiration.
                Definitely, I would advise.”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-box">
              <div className="testimonial-flex">
                <img src={person_3} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Lea Botha</p>
                  <p className="testimonial-state">South Africa</p>
                </div>
              </div>
              <p className="testimonial-test">
                “Probably the best platform for anyone needing to generate bulk
                certificates. Amazing! I love how easy it is to use! Recommended
                for EVERYONE!”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-box">
              <div className="testimonial-flex test-image2">
                <img src={person_1} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Jessica Anoke</p>
                  <p className="testimonial-state">Nigeria</p>
                </div>
              </div>
              <p className="testimonial-test">
                “Probably the best platform for anyone needing to generate bulk
                certificates. Amazing! I love how easy it is to use! Recommended
                for EVERYONE!”
              </p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="testimonial-box">
              <div className="testimonial-flex test-image">
                <img src={person_5} alt="user" />
                <div className="text">
                  <p className="testimonial-name">Todd Holgate</p>
                  <p className="testimonial-state">Poland</p>
                </div>
              </div>
              <p className="testimonial-test">
                “I came across this website when I needed a bulk certificate
                generator for my course. It is straightforward and I like the
                frames as they look very professional. It is quite affordable.”
              </p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </>
  );
}
