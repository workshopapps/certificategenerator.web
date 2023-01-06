import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./signup.scss";
import Input from "../../Input";
import Button from "../../button";
import Loader from "../../ButtonLoader";
import { Toast } from "../../ToastAlert";
import googleSVG from "./assets/google.svg";
import { baseURL } from "../../../api/axios";
import cert from "./assets/Frame 427319608.svg";
import useAppProvider from "../../../hooks/useAppProvider";

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
    return fetch(`${baseURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
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
        throw new Error("Email already exists, login");
      } else if (response.status === 400) {
        Toast.fire({
          icon: "error",
          title: "Name input required"
        });
        setLoading(false);
        throw new Error("Name input required");
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
    } catch (error) {
      setLoading(false);
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

    if (token.accessToken) createNewUserGoogle(token);

    localStorage.setItem("username", res.profileObj.email);
    localStorage.setItem("name", res.profileObj.name);
  };

  const onFailure = err => {
    console.log("failed:", err);
  };

  // Send access token to backend
  async function createNewUserGoogle(token) {
    const response = await fetch(`${baseURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    });

    if (response.status === 200 || response.status === 201) {
      // route user to dashboard after successful login
      navigate("/login");
    } else if (response.status === 401) {
      Toast.fire({
        icon: "error",
        title: "Email already in use"
      });
    } else {
      navigate("/signup");
    }
  }

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
                onChange={handleChange}
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
