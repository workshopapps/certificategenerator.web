import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Style.css";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import emailSVG from "./assets/email.svg";
import keySVG from "./assets/key.svg";
import { loginUser } from "../api";
import Input from "../../Input";

const Login = ({ access, setAccess }) => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false
  });

  const [useremail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

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
  async function loginUser(email, password) {
    return fetch("https://certify-api.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser(useremail, password);
    const data = await response.json().catch(error => {
      setError("apiError", { message: error });
    });

    const token = data.token;
    setAccess(token);
    {
      data.token ? navigate("/pricing") : navigate("/login");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", data.userId);
  };

  return (
    <div>
      <div className="authContainer">
        <div className="formDiv">
          <form onSubmit={handleSubmit}>
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
                type="text"
                name="email"
                callback={e => setUserEmail(e.target.value)}
                required
                style={{ border: "none" }}
              />
            </div>
            <div id="pwd">
              <img alt="" src={keySVG} />

              <Input
                id="input_id"
                placeholder="Password"
                type="text"
                name="password"
                callback={e => setPassword(e.target.value)}
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

            {error && <p className="login-error">Invalid Email or Password</p>}
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
              onClick={handleSubmit}
              value="Login"
              id="btn"
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
