
import React from "react";
import {Link} from "react-router-dom";
import {useState} from 'react'
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import './Style.css'
import appleSVG from "./assets/apple.svg"
import googleSVG from "./assets/google.svg"
import cert from "./assets/Cert.png"

const Signup = () => {
    const [type, setType]=useState('password');
    const [icon, setIcon]=useState(eyeOff);
    const [formData, setFormData] = React.useState({ email: "",  acceptTerms: false})
  
    /* implementing hide and reveal password */
    const handleToggle=()=>{    
      if(type==='password'){
        setIcon(eye);      
        setType('text');
      }
      else{
        setIcon(eyeOff);     
        setType('password');
      }
    }
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    return(
        <div className="container">
            <div className="formDiv">
            <h3 id="heading">Welcome to Certawi</h3>    
                <span id="startGenerating">Start generating certificates by creating a Certawi account</span>
                <div id="signupG">
                    <img alt="" src={googleSVG} id="img_id" />
                    <a href="#">Signup using Google</a>
                </div>
                <div id="signupA">
                    <img alt="" src={appleSVG} id="img_id" />
                    <a href="#">Signup using Apple</a>
                </div>
                <div id="hrLine"><span id="or">or</span></div>
                 <form>
                    <input id="email" placeholder=" Email" type="email" required></input>
                    <div id="pwd">
                        <input id="input_id" placeholder="Create a password" type={type} required/>
                        <span onClick={handleToggle}><Icon icon={icon} size={25}/></span>
                    </div>
                    <div id="checkTerms">
                        <input type="checkbox" id="acceptTerms" checked={formData.acceptTerms}
                        onChange={handleChange} name="acceptTerms"/>
                        <div className="termsOfUse">By creating an account, I declare that I have 
                        read and accepted Certawi’s <span id="coloredTerms">Terms of Use</span> and 
                        <span id="coloredTerms">Privacy Policy</span></div>
                    </div>
                    <button id="btn">Create Account</button>
                </form>   
                <p>Already have an account? <span><Link to="/login">Login</Link></span></p>
            </div>   
            <div className="emptySpace"><img className="cert_img" alt="" src={cert}/></div>         
        </div>
    )
}
export default Signup