import "./layout.style.scss";
import Footer from "../Footer";

import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
