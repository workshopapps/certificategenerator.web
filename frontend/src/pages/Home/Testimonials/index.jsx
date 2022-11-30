import React from "react";
import './testimonials.style.scss'
import person_1 from '../../../assets/images/person-1.png'
import person_2 from '../../../assets/images/person-2.png'
import person_3 from '../../../assets/images/person-3.png'

export default function Testimonials () {
    return (
        <>
          <p className="sora testimonial-header">Testimonials</p>
          <p className="testimonial-caption work-sans">What our users have to say about us</p>
          <div className="flex testimonials center justify-between gap testimonial-bottom">
            <div className="testimonial-container text-left work-sans test">
              <div className="flex items-center" >
                <img src={person_1} alt="user" />
                <div style={{paddingLeft: '20px'}}>
                    <p style={{fontWeight: '600'}}>Lindsay Favazza</p>
                    <p>United States</p>
                </div>
              </div>
              <p style={{paddingTop: "25px"}}>
                  “Certgo is an incredible website for designing certificates! A huge selection of templates, fonts, and colors; endless choices at the tip of your fingers; easy editing and sending/sharing. Best certificate generator I've used for a long time. If you haven't tried it... try it!
                  Victor Hayworth”
              </p>
            </div>

            <div className="testimonial-container text-left work-sans test">
              <div className="flex items-center" >
                <img src={person_2} alt="user" />
                <div style={{paddingLeft: '20px'}}>
                    <p style={{fontWeight: '600'}}>Valerie Tan</p>
                    <p>Singapore</p>
                </div>
              </div>
              <p style={{paddingTop: "25px"}}>
                “Certgo is a fantastic piece of software! It saves us a lot of time, as we were able to generate bulk certificates for our students automatically. The customer support is also excellent and helps us navigate the software and recommend a solution for the changes we need.”
              </p>
            </div>

            <div className="testimonial-container text-left work-sans test">
              <div className="flex items-center" >
                <img src={person_3} alt="user" />
                <div style={{paddingLeft: '20px'}}>
                    <p style={{fontWeight: '600'}}>Lea Botha</p>
                    <p>South Africa</p>
                </div>
              </div>
              <p style={{paddingTop: "25px"}}>
                “Certgo is great for designing certificates for my students enrolled in my courses. The various letter font styles and font colors are wonderful to choose from. The final look and design of the certification are professional. I enjoy using this easy website.”
              </p>
            </div>
            
          </div>
        </>
    )
}