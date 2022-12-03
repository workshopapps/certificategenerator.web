import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../Component/button";
import Layout from "./ResetLayout";

const PasswordChangeSuccessfully = () => {
  const navigate = useNavigate();
  const h2 = " Password changed successfully";
  const p = "You can now use new password to sign in";
  const element = [
    <Link to={navigate("/login")}>
      <Button name={"Sign in"} onClick={navigate("/login")} />
    </Link>,
    <Link to={"/"}>
      <Button name={"Back to Home"} className={"btnLight"} />
    </Link>
  ];
  return (
    <>
      <Layout p={p} h2={h2} element={element} />
    </>
  );
};

export default PasswordChangeSuccessfully;
