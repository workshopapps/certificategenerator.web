import React from "react";
import { useState } from "react";
import Button from "../../Component/button";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";

const ResetPassword = () => {
  const [newPassword1, setNewPassword1] = useState();
  const [newPassword2, setNewPassword2] = useState();
  const h2 = " Reset Password";
  const p = "Please enter your prefered password";
  const element = [
    <Input
      type={"password"}
      placeholder="New password"
      value={newPassword1}
      onChange={e => setNewPassword1(e.target.value)}
      id="resetEmail"
      label="New password"
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
      <Layout p={p} h2={h2} element={element} />
    </>
  );
};

export default ResetPassword;
