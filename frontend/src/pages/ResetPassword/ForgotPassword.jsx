import React from "react";
import { useState } from "react";
import Button from "../../Component/button";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const h2 = "Forgot Password?";
  const p =
    "Please enter your registered email address below and a link will be sent to you to reset your password";
 
    const element = [
    <Input
      type={"email"}
      placeholder="Enter your email address"
      value={email}
      onChange={e => setEmail(e.target.value)}
      id="resetEmail"
      label="Enter your email address"
    />,
    <Button name={"Send Link"} />
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
