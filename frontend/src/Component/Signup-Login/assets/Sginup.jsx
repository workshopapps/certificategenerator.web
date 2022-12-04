import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Style.css";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import emailSVG from "./assets/email.svg";
import keySVG from "./assets/key.svg";
import { createNewUser } from "../api";
import Swal from "sweetalert2";
import Input from "../../Input";

const Signup = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [formData, setFormData] = React.useState({
    password: "",
    email: "",
    acceptTerms: false
  });
  const [token, setToken] = useState({
    accessToken: ""
  });

  // Google auth client ID
  const CLIENT_ID =
    "52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com";

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
      const response = await createNewUser({
        password: formData?.password,
        email: formData?.email
      });

      if (response && response.data) {
        //redirect a successfull signup here ...
        // navigate("/login")
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
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

    if (token.accessToken) createNewUser(token);

    localStorage.setItem("username", res.profileObj.email);
    localStorage.setItem("name", res.profileObj.name);
  };

  const onFailure = err => {
    console.log("failed:", err);
  };

  // Send access token to backend
  async function createNewUser(token) {
    const response = await fetch("https://certgo.hng.tech/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    });

    console.log("api response: ", response);

    if (response.status === 200 || response.status === 201) {
      Toast.fire({
        icon: "success",
        title: "Signed up successfully"
      });
      // route user to dashboard after successful signup/login
      navigate("/dashboard");
    } else {
      Toast.fire({
        icon: "error",
        title: "Something went wrong"
      });
      navigate("/login");
    }
  }

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
            <img alt="" src={appleSVG} id="img_id" />
            <a href="#">Signup using Apple</a>
          </div>
          <div id="hrLine">
            <span id="or">or</span>
          </div>
          <form>
            {/* <div id="email"> */}
            {/* <img alt="" src={emailSVG} /> */}
            <Input
              label="Email"
              className="email_input"
              placeholder=" Email"
              type="email"
              required
              name="email"
              callback={handleChange}
              value={formData.email}
            />
            {/* </div> */}
            {/* <div id="pwd"> */}
            {/* <img alt="" src={keySVG} /> */}
            <Input
              label="Password"
              eyecon={true}
              // id="input_id"
              className="pw_input"
              placeholder="Create a password"
              type={"password"}
              required
              name="password"
              callback={handleChange}
              value={formData.password}
            />
            {/* <span onClick={handleToggle}>
                {type === "text" ? (
                  <AiOutlineEye size={25} className="eye" />
                ) : (
                  <AiOutlineEyeInvisible size={25} className="eye" />
                )}
              </span> */}
            {/* </div> */}
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
            <Input
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
