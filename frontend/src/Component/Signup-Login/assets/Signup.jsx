import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import "./signup.scss";
import appleSVG from "./assets/apple.svg";
import googleSVG from "./assets/google.svg";
import cert from "./assets/Cert.png";
import Input from "../../Input";
import Button from "../../button";
import { Toast } from "../../ToastAlert";
import useAppProvider from "../../../hooks/useAppProvider";
import Loader from "../../ButtonLoader";
import axios from "../../../api/axios";

const Signup = () => {
  const { setAccess } = useAppProvider();
  const navigate = useNavigate();
  const location = useLocation();

  // const [type, setType] = useState("password");
  const type = "password";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    checkbox: ""
  });
  // Google auth client ID
  const CLIENT_ID =
    "52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com";
  const [userName, setUserName] = useState();
  const [useremail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [checkbox, setCheckbox] = useState(false);

  // const [error, setError] = useState(false);
  const [token, setToken] = useState({
    accessToken: ""
  });

  //   const handleToggle = () => {
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

  async function createNewUser(email, password, name, checkbox) {
    console.log(email, password, name, checkbox);
    // return axios.post("/auth/signup", { email: email, password: password, name: name, checkbox: checkbox });
    return fetch(`https://certgo.hng.tech/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        checkbox: checkbox
      })
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createNewUser(useremail, password, userName);

      if (response.status === 200 || response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Signed up successfully"
        });
        if (location.state?.from.pathname) {
          navigate(location.state.from);
        } else {
          navigate("/login");
        }
        setLoading(false);
        setAccess(true);
      }

      // }
      else if (response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "Email already exists, login"
        });
        setLoading(false);
        throw new Error("Page not found");
      } else if (response.status === 400) {
        Toast.fire({
          icon: "error",
          title: "Invalid Email, please try again"
        });
        setLoading(false);
        throw new Error("Invalid Email, please try again");
      } else if (response.status === 500) {
        Toast.fire({
          icon: "error",
          title: "Server Error"
        });
        setLoading(false);
        throw new Error("Server Error");
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong"
        });
        setLoading(false);
        throw new Error("Something went wrong");
      }
      const token = response.data.token;
      localStorage.setItem("token", token);
      // localStorage.setItem("user", response.userId);
    } catch (error) {
      // setError(true);
      setLoading(false);
      console.log(error.message);
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
    console.log(res.tokenID);

    // User details from Google
    // const userProfile = {
    //   email: res.profileObj.email,
    //   fullName: res.profileObj.name,
    //   userProfile: res.profileObj.imageUrl,
    //   userId: res.profileObj.googleId,
    //   accessToken: res.accessToken
    // };

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

    if (response.status === 200 || response.status === 201) {
      // route user to dashboard after successful login
      navigate("/login");
    } else if (response.status === 401) {
      Toast.fire({
        icon: "error",
        title: "Email already in use"
      });
      console.log("in use");
    } else {
      navigate("/signup");
    }
  }

  //SAVING PROFILENAME TO LOCAL STORAGE
  localStorage.setItem("profileName", userName);

  return (
    <div id="signup">
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
              <div
                onClick={renderProps.onClick}
                id="signupG"
                style={{ cursor: "pointer" }}
              >
                <img alt="" src={googleSVG} id="img_id" />
                Signup using Google
                {/* <a href="#">Signup using Google</a> */}
              </div>
            )}
          />
          {/* <div id="signupA">
            <img alt="" src={appleSVG} id="img_id" />
            Signup using Apple
          </div> */}
          <div id="hrLine">
            <span id="or">or</span>
          </div>
          <form>
            {/* <div id="email"> */}
            {/* <img alt="" src={emailSVG} /> */}
            <Input
              label="Name"
              className="email_input"
              placeholder=" Name"
              type="text"
              name="name"
              callback={e => setUserName(e.target.value)}
              required
              value={userName}
            />
            <Input
              label="Email"
              className="email_input"
              placeholder=" Email"
              type="email"
              name="email"
              callback={e => setUserEmail(e.target.value)}
              required
              value={useremail}
            />
            {/* </div> */}
            {/* <div id="pwd"> */}
            {/* <img alt="" src={keySVG} /> */}
            <Input
              label="Password"
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
            <div id="checkTerms">
              <input
                type="checkbox"
                id="checkbox"
                value={checkbox}
                checked={formData.acceptTerms}
                // onChange={handleChange}
                name="acceptTerms"
                callback={e => setCheckbox(e.target.value)}
                required
              />
              <div className="termsOfUse">
                By creating an account, I declare that I have read and accepted
                Certgo’s <span id="coloredTerms"> Terms of Use</span> and
                <span id="coloredTerms"> Privacy Policy</span>
              </div>
            </div>

            <div>
              <Button id="btn" onClick={handleSubmit} style={{ width: "100%" }}>
                {loading ? <Loader /> : <span>Create Account</span>}
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
