import "./layout.style.scss";
import React from "react";

import Navbar from "../Navbar";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
