import React from "react";
import { useState } from "react";
import Button from "../../Component/button";
import Layout from "./ResetLayout";

const PassswordLinkSent = () => {
  const [email, setEmail] = useState();
  const h2 = "Password link sent";
  const p = `A password reset link has been sent to this registered email ${email}`;
  const element = [
    <a href={`mailto:${email}`}>
      <Button name={"Go to indox"}></Button>
    </a>
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

export default PassswordLinkSent;
