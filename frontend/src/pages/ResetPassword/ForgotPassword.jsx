import React from "react";
// import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";
import { Toast } from '../../Component/ToastAlert'
import Button from "../../Component/button";
import {ButtonLoader} from '../../Component'

const ForgotPassword = () => {
  const [email, setEmail] = useState(); 
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  

  const h2 = "Forgot Password?";
  const p =
    "Please enter your registered email address below and a link will be sent to you to reset your password";

    async function forgotPassword({email}) {
    return fetch(`https://certify-api.onrender.com/api/auth/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "POST",     
      },
      body: JSON.stringify({ email: email})
    });
  }
    const handleSubmit = async e =>{ 
       e.preventDefault()
      setLoading(true)
        try {
            if(email === '' || email === null){
            alert('email cannot be empty')
            return false;
       }else{
        const response = await forgotPassword({email});
              if (response.status === 200 || response.status === 201) {
                Toast.fire({
                  icon: "success",
                  title: "password reset link sent to your email account"
                });
                setLoading(false)
                navigate("/fff2");
              }else if (response.status === 400) {
                Toast.fire({
                  icon: "error",
                  title: "User does not exists"
                });
                setLoading(false)
                throw new Error("User does not exists");
              } else if (response.status === 500) {
                Toast.fire({
                  icon: "error",
                  title: "Server Error"
                });
                setLoading(false)
                throw new Error("Server Error");
              } else {
                Toast.fire({
                  icon: "error",
                  title: "Something went wrong"
                });
                setLoading(false)
                throw new Error("Something went wrong");
              } 
              }}  catch (error) {
                  console.error(error);
              }
          }
    
    const element = [
      <form onSubmit={handleSubmit}>
         <Input
            type="email"
            id="email"
            label={"Enter your email address"}
            placeholder="Enter your email address"
            value={email}
            callback={e => setEmail(e.target.value)}           
          />
          <Button type='submit' id={'submit'}  style={{width: '100%'}} >{loading? <ButtonLoader /> : <span>Send Link</span>}</Button>
      </form>
  

  ];
  return (
    <>
      <Layout
        p={p}
        h2={h2}
        element={element}
        link="Back to Sign in"
        linkto={"/login"}
      />
    </>
  );
};

export default ForgotPassword;