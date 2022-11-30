import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Style.css";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import emailSVG from "./assets/email.svg";
import keySVG from "./assets/key.svg";
import { loginUser } from "../api";
import Input from "../../Input";

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    acceptTerms: false
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
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      };
    });
  }

  const handleOnSubmit = async e => {
    try {
      e.preventDefault();
      const response = await loginUser({
        password: formData?.password,
        email: formData?.email
      });

      if (response && response.data) {
        //redirect a successfull login here ...
        navigate("/");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="authContainer">
        <div className="formDiv">
          <form>
            <div id="heading">Welcome to Certgo</div>
            <small id="startGenerating">
              Start generating certificates by creating a Certgo account
            </small>
            <div id="signupG">
              <img alt="" src={googleSVG} id="imgs" />
              Signup using Google
            </div>
            <div id="signupA">
              <img alt="" src={appleSVG} id="imgs" />
              Signup using Apple
            </div>
            <div id="hrLine">
              <span id="or">or</span>
            </div>
            <div id="email">
              <img alt="" src={emailSVG} />
              <Input
                className="email_input"
                placeholder=" Email"
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div id="pwd">
              <img alt="" src={keySVG} />
              <Input
                id="input_id"
                placeholder="Create a password"
                type={type}
                name="password"
                onChange={handleChange}
                required
              />
              <span onClick={handleToggle}>
                {type === "text" ? (
                  <AiOutlineEye size={25} className="eye" />
                ) : (
                  <AiOutlineEyeInvisible size={25} className="eye" />
                )}
              </span>
            </div>
            <div className="forgotPwd">Forgot password?</div>
            <div id="checkTerms">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                name="acceptTerms"
              />
              <label id="labels" htmlFor="acceptTerms">
                Remember me
              </label>
            </div>
            <Input
              type="submit"
              value="Login"
              id="btn"
              onClick={handleOnSubmit}
            />
          </form>
          <p className="haveAccount">
            Don’t have a Certgo account?{" "}
            <Link to="/signup" id="coloredTerms">
              Create an account{" "}
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
export default Login;
