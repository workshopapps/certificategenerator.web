import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState(); 
const navigate = useNavigate()

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
  

  const h2 = "Forgot Password?";
  const p =
    "Please enter your registered email address below and a link will be sent to you to reset your password";

    const handleSubmit = async e =>{
      e.preventDefault()

      // const button = document.querySelector("#submit");

      // button.setAttribute("name", "Loading...");
      // button.setAttribute("disabled", "");

       if(email === ''){
        alert('email cannot be empty')
        return false;
       }else{
       await axios
            .post('https://certgo.hng.tech/api/auth/forgotpassword', {email})
             .then((response) => {
                console.log(response);
                console.log(response.status);
              if (response.status === 200 || response.status === 201) {
                Toast.fire({
                  icon: "success",
                  title: "password reset link sent to your email account"
                });
                navigate("/fff2");
              }else if (response.status === 400) {
                Toast.fire({
                  icon: "error",
                  title: "User does not exists"
                });
                throw new Error("User does not exists");
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
            }).catch(err => {
              console.log(err.message);
            })
       }
    }
    const element = [
      <form >
         <Input
            type="email"
            id="email"
            label={"Enter your email address"}
            placeholder="Enter your email address"
            value={email}
            callback={e => setEmail(e.target.value)}           
          />
          <Input type='submit' id={'submit'} callback={handleSubmit} name={"Send Link"} style={{width: '100%'}} />
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
