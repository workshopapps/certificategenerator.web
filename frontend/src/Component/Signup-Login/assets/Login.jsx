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
import Loader from "../../ButtonLoader";

const Login = () => {
  const { setAccess } = useAppProvider();
  const navigate = useNavigate();
  const [type] = useState("password");
  const [loading, setLoading] = useState(false)
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
 
  async function loginUser(email, password) {
    return axios.post("/auth/login", { email: email, password: password });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await loginUser(useremail, password);
      console.log(response)

      if (response.status === 200 || response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
        navigate("/dashboard");
        setLoading(false)
        setAccess(true);
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong"
        });
        
        setLoading(false)
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
     
      console.log(error)
     if (error.response.status === 400) {
       Toast.fire({
         icon: "error",
         title: "A user for this email could not be found"
       });

       setLoading(false);
       
     } else if (error.response.status === 401) {
       Toast.fire({
         icon: "error",
         title: "Invalid password, please try again"
       });
       setLoading(false);

     } else if (error.response.status === 500) {
       Toast.fire({
         icon: "error",
         title: "Internal server Error"
       });

       setLoading(false);

      
     } else {
       Toast.fire({
         icon: "error",
         title: "Something went wrong"
       });

       setLoading(false);
      
     }
      
      
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
  }, [])
  

  const onSuccess = res => {
    setToken({ accessToken: res.tokenId });

    if (token.accessToken) loginUserGoogle(token);

    
  };

  const onFailure = err => {
    console.log("failed:", err);
  };

  // Send access token to backend
  async function loginUserGoogle(token) {
    const response = await axios.post("/auth/login", token);

    // send response to localstorage
    const userData = {
      userId: response.data.data.userId,
      token: response.data.data.token,
      refreshToken: response.data.data.refreshToken,
      subscription: response.data.data.subscription
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    
  
    navigate("/dashboard");

   
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
                <div onClick={renderProps.onClick} id="signupG" style={{ cursor: "pointer" }}>
                  <img alt="" src={googleSVG} id="img_id" />
                  Login using Google
                </div>
              )}
            />
            <div id="signupA">
              <img alt="" src={appleSVG} id="imgs" />
              Login using Apple
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
           
            <div className="forgotPwd"><Link to="/fff1">
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
                {loading ? <Loader /> : <span>Login</span>}
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