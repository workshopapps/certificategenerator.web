import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./login.scss";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import emailSVG from "./assets/email.svg";
import keySVG from "./assets/key.svg";
import { loginUser } from "../api";
import Input from "../../Input";
import Swal from 'sweetalert2'


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

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


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

    const response = await loginUser(useremail, password)
      .then(response => {
        
        if (response.status === 404) {
          Toast.fire({
            icon: 'error',
            title: 'Page not found'
          })
        
          throw new Error("Page not found");
        } 
        
        else if (response.status === 200) {
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          navigate("/pricing");
          setAccess(true)
        }

        else if (response.status === 401) {
       
          Toast.fire({
            icon: 'error',
            title: 'Invalid Email or Password, please try again'
          })
          throw new Error("Invalid Email or Password, please try again");
       
        }
        
        else if (response.status === 500) {
          Toast.fire({
            icon: 'error',
            title: 'Server Error'
          })
       
          throw new Error("Server Error");
         
        }
     

        if (!response.ok) {
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          })
         
          throw new Error("Something went wrong");
        }
        
        return response.json();
      })

      .then(() => {
        const data = response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", data.userId);
      })
      .catch(e => {
        console.log(e.message);
      });
  };
 
  
 
  return (
    <div id = "login">
  
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
              id="email_input"
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
                className="pw_input"
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

            <div>
            <button id = 'btn' onClick = {handleSubmit}>
            Login
            </button>
            </div>

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
