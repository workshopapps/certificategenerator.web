import React from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUserAdd,
} from "react-icons/ai";
import "./Style.css";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import emailSVG from "./assets/email.svg";
import keySVG from "./assets/key.svg";
import { createNewUser } from "../api";
import Login from "./Login";

const Signup = () => {
  const navigate = useNavigate()
  const [type, setType] = useState("password");
  const [formData, setFormData] = React.useState({
    password: "",
    email: "",
    acceptTerms: false,
  });

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const handleOnSubmit = async (e) => {
    
    try {
      e.preventDefault();
      const response = await createNewUser({
        password: formData?.password,
        email: formData?.email,
      });

      if (response && response.data) {
        //redirect a successfull signup here ...
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <div className="logo-container">
                <div className="logo-div">
                    <img className="logo" alt="" src={logoSVG}/>
                    <img className="menu" alt="" src={menuSVG}/>
                </div>
            </div> */}
      <div className="authContainer">
        <div className="formDiv">
          <div id="heading">Welcome to Certonic</div>
          <span id="startGenerating">
            Start generating certificates by creating a Certonic account
          </span>
          <div id="signupG">
            <img alt="" src={googleSVG} id="img_id" />
            <a href="#">Signup using Google</a>
          </div>
          <div id="signupA">
            <img alt="" src={appleSVG} id="img_id" />
            <a href="#">Signup using Apple</a>
          </div>
          <div id="hrLine">
            <span id="or">or</span>
          </div>
          <form>
            <div id="email">
              <img alt="" src={emailSVG} />
              <input
                className="email_input"
                placeholder=" Email"
                type="email"
                required
                name="email"
                onChange={handleChange}
              ></input>
            </div>
            <div id="pwd">
              <img alt="" src={keySVG} />
              <input
                id="input_id"
                placeholder="Create a password"
                type={type}
                required
                name="password"
                onChange={handleChange}
              />
              <span onClick={handleToggle}>
                {type === "text" ? (
                  <AiOutlineEye size={25} className="eye" />
                ) : (
                  <AiOutlineEyeInvisible size={25} className="eye" />
                )}
              </span>
            </div>
            <div id="checkTerms">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                name="acceptTerms"
              />
              <div className="termsOfUse">
                By creating an account, I declare that I have read and accepted
                Certawi’s <span id="coloredTerms"> Terms of Use</span> and
                <span id="coloredTerms"> Privacy Policy</span>
              </div>
            </div>
            <input
              type="submit"
              id="btn"
              value="Create Account"
              onClick={handleOnSubmit}
            />
          </form>
          <p className="haveAccount">
            Already have an account?{" "}
            <Link to="/login" id="coloredTerms">
              Login
            </Link>
          </p>
        </div>
        <div className="emptySpace">
          <img className="cert_img" alt="" src={cert} />
        </div>
      </div>
    </div>
  );
};
export default Signup;