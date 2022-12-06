import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Style.scss";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import emailSVG from "./assets/email.svg";
import keySVG from "./assets/key.svg";
import { createNewUser } from "../api";
import Input from "../../Input";
import Button from "../../button";
import Swal from "sweetalert2";



const Signup = ({ access, setAccess }) => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false
  });
  // Google auth client ID
  const CLIENT_ID =
    "52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com";
  
    const [useremail, setUserEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [token, setToken] = useState({
      accessToken: ""
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
  
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    async function createNewUser(email, password) {
      return fetch("https://certgo.hng.tech/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
      });
    }
  
    const handleSubmit = async e => {
      e.preventDefault();
  
      try{
        const response = await createNewUser(useremail, password)
        const data = await response.json();
  
        console.log(response);
        console.log(response.status);
  
        // .then(response => {
  
          // if (response.status === 404) {
          //   Toast.fire({
          //     icon: 'error',
          //     title: 'Page not found'
          //   })
  
          //   throw new Error("Page not found");
          // } 
  
           if (response.status === 200 || response.status === 201){
            Toast.fire({
              icon: 'success',
              title: 'Signed up successfully'
            })
            navigate("/dashboard");
            setAccess(true)
          }
  
          // } 
          else if (response.status === 401) {
          Toast.fire({
            icon: "error",
            title: "Page not found"
          });
  
          throw new Error("Page not found");
        } else if (response.status === 400) {
          Toast.fire({
            icon: "error",
            title: "Invalid Email, please try again"
          });
          throw new Error("Invalid Email, please try again");
        } else if (response.status === 500) {
          Toast.fire({
            icon: "error",
            title: "Server Error"
          });
          throw new Error("Server Error");
        } else {
          Toast.fire({
            icon: "error",
            title: "Something went wrong"
          });
  
          throw new Error("Something went wrong");
        }
      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", data.userId);
    } catch (error) {
      setError(true);
      console.log(error.message);
    };
    };
  

  // Google aunthetication
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: ""
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = res => {
    setToken({ accessToken: res.tokenId });

    // User details from Google
    const userProfile = {
      email: res.profileObj.email,
      fullName: res.profileObj.name,
      userProfile: res.profileObj.imageUrl,
      userId: res.profileObj.googleId,
      accessToken: res.accessToken
    };

    if (token.accessToken) createNewUserGoogle(token);

    localStorage.setItem("username", res.profileObj.email);
    localStorage.setItem("name", res.profileObj.name);
  };

  const onFailure = err => {
    console.log("failed:", err);
  };

 
  // Send access token to backend
  async function createNewUserGoogle(token) {
    const response = await fetch("https://certgo.hng.tech/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    });

    console.log(response);

    if (response.status === 200) {
      // route user to dashboard after successful login
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }

return (
    <div id="signup">
      <div className="authContainer">
        <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <div id="heading">Welcome to Certgo</div>
          <span id="startGenerating">
            Start generating certificates by creating a Certgo account
          </span>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            render={renderProps => (
              <div onClick={renderProps.onClick} id="signupG">
                <img alt="" src={googleSVG} id="img_id" />
                <a href="#">Signup using Google</a>
              </div>
            )}
          />
          <div id="signupA">
              <img alt="" src={appleSVG} id="imgs" />
              Signup using Apple
            </div>
            <div id="hrLine">
              <span id="or">or</span>
            </div>
            {/* <div id="email"> */}
            {/* <img alt="" src={emailSVG} /> */}
            <Input
              label={"Email"}
              id="email_input"
              placeholder=" Email"
              type="text"
              name="email"
              callback={e => setUserEmail(e.target.value)}
              required
              value={useremail}
            />
            {/* </div> */}
            {/* <div id="pwd"> */}
            {/* <img alt="" src={keySVG} /> */}
            <Input
              label={"Password"}
              id="input_id"
              placeholder=" Create a password"
              type={type}
              name="password"
              value={password}
              callback={e => setPassword(e.target.value)}
              required
              className="pw_input"
              eyecon={true}
            />
            {/* <span onClick={handleToggle}>
                {type === "text" ? (
                  <AiOutlineEye size={25} className="eye" />
                ) : (
                  <AiOutlineEyeInvisible size={25} className="eye" />
                )}
              </span> */}
            {/* </div> */}
            {error && <p style={{ color: "red" }}>Something went wrong</p>}

            <div id="checkTerms">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                name="acceptTerms"
              />
              <label id="labels" htmlFor="acceptTerms">
                By creating an account, I declare that I have read and accepted
                Certawi’s <span id="coloredTerms"> Terms of Use</span> and
                <span id="coloredTerms"> Privacy Policy</span>Remember me
              </label>
            </div>
            {/* <div> */}


      
            <div>
              <Button id="btn" onClick={handleSubmit} style={{ width: "100%" }}>
              Create Account
              </Button>
            </div>
          
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
