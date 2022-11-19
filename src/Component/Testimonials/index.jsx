import React from "react";
import './testimonials.style.scss'
import person_1 from '../../assets/images/person-1.png'
import person_2 from '../../assets/images/person-2.png'
import person_3 from '../../assets/images/person-3.png'

export default function Testimonials () {
    return (
        <>
          <p className="sora testimonial-header">Testimonials</p>
          <p className="testimonial-caption">What our users have to say about us</p>
          <div className="flex testimonials center justify-between gap testimonial-bottom">
            <div className="testimonial-container text-left sora test">
              <div className="flex items-center" style={{width: '343px'}}>
                <img src={person_1} alt="user" />
                <div style={{paddingLeft: '20px'}}>
                    <p style={{fontWeight: '600'}}>Lindsay Favazza</p>
                    <p>United States</p>
                </div>
              </div>
              <p style={{paddingTop: "25px"}}>
                  “This is my first time utilizing Certawi.
                  It is simply brilliant. In a matter of seconds, a full certificate is generated”
              </p>
            </div>

            <div className="testimonial-container text-left sora test">
              <div className="flex items-center" style={{width: '343px'}}>
                <img src={person_2} alt="user" />
                <div style={{paddingLeft: '20px'}}>
                    <p style={{fontWeight: '600'}}>Valerie Tan</p>
                    <p>Singapore</p>
                </div>
              </div>
              <p style={{paddingTop: "25px"}}>
                “The certawi certificate generator is a fantastic tool that helps me create certificates 
                quickly and with plenty of inspiration. Definitely, I would advise.”
              </p>
            </div>

            <div className="testimonial-container text-left sora test">
              <div className="flex items-center" style={{width: '343px'}}>
                <img src={person_3} alt="user" />
                <div style={{paddingLeft: '20px'}}>
                    <p style={{fontWeight: '600'}}>Lea Botha</p>
                    <p>South Africa</p>
                </div>
              </div>
              <p style={{paddingTop: "25px"}}>
                “Probably the best platform for anyone needing to generate bulk certificates. 
                Amazing! I love how easy it is to use! Recommended for EVERYONE!”
              </p>
            </div>
          </div>
        </>
    )
}