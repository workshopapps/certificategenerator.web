

import React from "react";
import { Link } from "react-router-dom";
import {useState} from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import './Style.css'
import appleSVG from "./assets/apple.svg"
import googleSVG from "./assets/google.svg"
import cert from "./assets/Cert.png"
import emailSVG from "./assets/email.svg"
import keySVG from "./assets/key.svg"
import logoSVG from "./assets/Certawi-logo.png"
import menuSVG from "./assets/menu.svg"

const Login = () => {
    const [type, setType]=useState('password');
    //const [isVisible, setisVisible]=useState(false);
    const [formData, setFormData] = React.useState({ email: "",  acceptTerms: false})
  
    const handleToggle=()=>{    
      if(type==='password'){
       // setisVisible(AiOutlineEye);      
        setType('text');
      }
      else{
      //  setisVisible(AiOutlineEyeInvisible);     
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
        <div>
            {/* <div className="logo-div">
                <img className="logo" alt="" src={logoSVG}/>
                <img className="menu" alt="" src={menuSVG}/>
            </div> */}
            <div className="authContainer">
                <div className="formDiv">
                    <form>
                        <div id="heading">Welcome to Certonic</div>    
                        <small id="startGenerating">Start generating certificates by creating a Certonic account</small>
                        <div id="signupG" ><img alt="" src={googleSVG} id="imgs"/>Signup using Google</div>
                        <div id="signupA" ><img alt="" src={appleSVG} id="imgs"/>Signup using Apple</div>
                        <div id="hrLine"><span id="or">or</span></div>
                        <div id="email">
                            <img alt="" src={emailSVG}/>
                            <input className="email_input" placeholder=" Email" type="email" required></input>    
                        </div>         
                        <div id="pwd">
                            <img alt="" src={keySVG}/>
                            <input id="input_id" placeholder="Create a password" type={type} required/>
                            <span onClick={handleToggle}>
                            {type==="text" ? <AiOutlineEye size={25} className="eye"/> : <AiOutlineEyeInvisible size={25} className="eye" />}</span>
                        </div>
                        <div className="forgotPwd">Forgot password?</div>
                        <div id="checkTerms">
                            <input type="checkbox" id="acceptTerms" checked={formData.acceptTerms}
                            onChange={handleChange} name="acceptTerms"/>
                            <label id="labels" htmlFor="acceptTerms">Remember me</label>
                        </div>
                        <input id="btn" type="submit" value="Login" />
                    </form>   
                    <p className="haveAccount">Don’t have a Certonic account? <Link to="/signup" id="coloredTerms">Create an account </Link></p>
                </div>
                <div className="emptySpace"><img className="cert_img" alt="" src={cert}/></div>
            </div>
        </div>
    )
}
export default Login