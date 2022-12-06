import React from "react";
import Button from "../../Component/button";
import Layout from "./ResetLayout";

const PassswordLinkSent = () => {
  const h2 = "Password link sent";
  const p = `A password reset link has been sent to this registered email`;
  const element = [
    <a href='https://mail.google.com' target='_blank' rel='noreferrer'>
      <Button name={"Go to inbox"}></Button>
    </a>
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

export default PassswordLinkSent;
