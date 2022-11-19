import "./layout.style.scss";
import React from "react";

import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      Nav
      
      <Outlet />
      Footer
    </div>
  );
};

export default Layout;
