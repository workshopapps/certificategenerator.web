
import React from "react";
import {Link} from "react-router-dom";
import {useState} from 'react'
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'

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
        <div>
            <div>
                 <form>
                    <h3 id="heading">Welcome to Certawi</h3>    
                    <small id="startGenerating">Start generating certificates by creating a Certawi account</small>
                    <div id="signupG" type="button"><img alt="" src="g.png"/>Signup using Google</div>
                    <div id="signupA" type="button"><img alt="" src="apple.png" />Signup using Apple</div>
                    <h2><span id="hrSpan">or</span></h2>
                    <input id="email" placeholder=" Email" type="email" ></input>
                    <input placeholder="Create a password" type={type}/><span onClick={handleToggle}>
                        <Icon icon={icon} size={25}/></span>
                    <input type="checkbox" id="acceptTerms" checked={formData.acceptTerms}
                        onChange={handleChange} name="acceptTerms"/>
                    <label id="labels" htmlFor="acceptTerms">By creating an account, I declare that I have 
                        read and accepted Certawi’s Terms of Use and Privacy Policy</label>
                </form>   
                <p>Already have an account? <span><Link to="/login">Login</Link></span></p>
            </div>            
        </div>
    )
}
export default Signup