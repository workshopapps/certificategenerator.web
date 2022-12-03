import React from "react";
import { useState } from "react";
import Button from "../../Component/button";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword1, setNewPassword1] = useState();
  const [newPassword2, setNewPassword2] = useState();
  const h2 = " Change Password";
  const p = "Please enter your prefered password";
  const element = [
    <Input
      type={"password"}
      placeholder="Enter old password"
      value={oldPassword}
      onChange={e => setOldPassword(e.target.value)}
      id="resetEmail"
      label="Enter old password"
      eyecon={true}
    />,
    <Input
      type={"password"}
      placeholder="Enter new password"
      value={newPassword1}
      onChange={e => setNewPassword1(e.target.value)}
      id="resetEmail"
      label="Enter new password"
      eyecon={true}
    />,
    <Input
      type={"password"}
      placeholder="Confirm new password"
      value={newPassword2}
      onChange={e => setNewPassword2(e.target.value)}
      id="resetEmail"
      label="Confirm new password"
      eyecon={true}
    />,
    <Button name={"Change Password"} />
  ];
  return (
    <>
      <Layout
        p={p}
        h2={h2}
        element={element}
        link="Back to Sign in"
        linkto={"/signin"}
      />
    </>
  );
};

export default ChangePassword;
