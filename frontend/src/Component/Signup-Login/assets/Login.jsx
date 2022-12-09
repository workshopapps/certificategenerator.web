import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import "./login.scss";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import { Toast } from '../../ToastAlert'
import Input from "../../Input";
import Button from "../../button";
import useAppProvider from "../../../hooks/useAppProvider";
import axios from "../../../api/axios";

const Login = () => {
  const { setAccess } = useAppProvider();
  const navigate = useNavigate();
  const [type] = useState("password");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false
  });

  const CLIENT_ID =
    "52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com";

  const [useremail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [token, setToken] = useState({
    accessToken: ""
  });

  // const handleToggle = () => {
  //   if (type === "password") {
  //     setType("text");
  //   } else {
  //     setType("password");
  //   }
  // };

 
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      };
    });
  }
  // const handleSubmit = async (e) => {

  //   e.preventDefault()
  //   console.log(useremail, password)
  //   try {
  //     const response = await loginUser(useremail, password);
  //     const data = await response.json();

  //     if (response.status === 200 || response.status === 201) {
  //       Toast.fire({
  //         icon: "success",
  //         title: "Signed in successfully"
  //       });
  //       navigate("/pricing");
  //       setAccess(true);
  //     } else if (response.status === 401) {
  //       Toast.fire({
  //         icon: "error",
  //         title: "Page not found"
  //       });

  //       throw new Error("Page not found");
  //     } else if (response.status === 400) {
  //       Toast.fire({
  //         icon: "error",
  //         title: "Invalid Email or Password, please try again"
  //       });
  //       throw new Error("Invalid Email or Password, please try again");
  //     } else if (response.status === 500) {
  //       Toast.fire({
  //         icon: "error",
  //         title: "Server Error"
  //       });

  //       throw new Error("Server Error");
  //     } else {
  //       Toast.fire({
  //         icon: "error",
  //         title: "Something went wrong"
  //       });

  //       throw new Error("Something went wrong");
  //     }

  //     const token = data.token;
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user", data.userId);
  //   } catch (error) {
  //     setError(true);
  //   }
  // }
  async function loginUser(email, password) {
    return axios.post("/auth/login", { email: email, password: password });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await loginUser(useremail, password);
      console.log(response)

      if (response.status === 200 || response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
        navigate("/dashboard");
        setAccess(true);
      } else if (response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "Page not found"
        });

        throw new Error("Page not found");
      } else if (response.status === 400) {
        Toast.fire({
          icon: "error",
          title: "Invalid Email or Password, please try again"
        });
        throw new Error("Invalid Email or Password, please try again");
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

       const userData = {
        userId: response.data.data.userId,
        token: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
        subscription: response.data.data.subscription,
      }
      localStorage.setItem('userData', JSON.stringify(userData))
     console.log(userData)

    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };


  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: CLIENT_ID
        // scope: ""
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = res => {
    setToken({ accessToken: res.tokenId });

    // User details from Google
    // const userProfile = {
    //   email: res.profileObj.email,
    //   fullName: res.profileObj.name,
    //   userProfile: res.profileObj.imageUrl,
    //   userId: res.profileObj.googleId,
    //   accessToken: res.accessToken
    // };

    if (token.accessToken) loginUserGoogle(token);

    localStorage.setItem("username", res.profileObj.email);
    localStorage.setItem("name", res.profileObj.name);
  };

  const onFailure = err => {
    console.log("failed:", err);
  };

  // Send access token to backend
  async function loginUserGoogle(token) {
    const response = await fetch("https://certgo.hng.tech/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    });

    console.log(response);

    if (response.status === 200 || response.status === 201) {
      // route user to dashboard after successful login
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }
  return (
    <div id="login">
      <div className="authContainer">
        <div className="formDiv">
          <form onSubmit={handleSubmit}>
            <div id="heading">Welcome to Certgo</div>
            <small id="startGenerating">
              Start generating certificates by creating a Certgo account
            </small>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              render={renderProps => (
                <div onClick={renderProps.onClick} id="signupG" style={{cursor:"pointer"}}>
                  <img alt="" src={googleSVG} id="img_id" />
                    Login using Google
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
              placeholder="Password"
              type={type}
              name="password"
              value={password}
              callback={e => setPassword(e.target.value)}
              required
              className="pw_input"
              eyecon={true}
            />

            {/* </div> */}
            {error && <p style={{ color: "red" }}>Something went wrong</p>}
            <div className="forgotPwd"><Link to = "/fff1">
            Forgot password?</Link></div>
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
              <Button id="btn" onClick={handleSubmit} style={{ width: "100%" }}>
                Login
              </Button>
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