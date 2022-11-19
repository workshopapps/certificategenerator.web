import React from "react";
import './hero.style.scss'
import hero from '../../assets/images/hero.png'
import tick from '../../assets/images/tick.png'
import google from '../../assets/images/google.png'
import udemy from '../../assets/images/udemy.png'
import coursera from '../../assets/images/coursera.png'
import skillshare from '../../assets/images/skillshare.png'

export default function Hero () {
    return (
        <>
          <div className="flex center justify-between">
               <div className="hero-left">
                  <p className="hero-text sora">
                    Create and download
                    your <span className="emphasized">professional 
                    certificates</span> for 
                    <span className="emphasized"> free</span>
                  </p>
                  <p className="work-sans line-height">Generate professionally designed certificates for your staff, students etc.</p>
                  <button className="hero-button">Create a certificate now</button>
               </div>
               <img src={hero} alt='hero' className="hero-img"></img>
           </div>

           <div className="line-height flex justify-between center text-left work-sans perks" style={{padding: "20px 0 0 0"}}>
               <div className="flex items-center" style={{width: "447px", gap: '10px'}}>
                  <img src={tick} alt='tick' className="tick"></img>
                  <p>No design skill needed. Choose from a variety of stunning templates.</p>
               </div>
               <div className="flex items-center" style={{width: "325px", gap: '10px'}}>
                  <img src={tick} alt='tick' className="tick"></img>
                  <p>Edit template to your preferred look and feel.</p>
               </div>
               <div className="flex items-center" style={{width: "294px", gap: '10px'}}>
                  <img src={tick} alt='tick' className="tick"></img>
                  <p>Create and Send single and bulk certificate.</p>
               </div>
           </div>
           <p className="partner-head sora">Trusted by  schools and institutions; big and small</p>
           <div className="partners">
              <img src={google} alt="google"/>
              <img src={udemy} alt="udemy" />
              <img src={coursera} alt="cousera" />
              <img src={skillshare} alt="skillshare" />
              <img src={google} alt="google" />
              <img src={coursera} alt="coursera" />
              <img src={skillshare} alt="skillshare" />
           </div>
        </>
    )
}