import "./layout.style.scss";
import SinglePreview from "../SinglePreview";
import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
	return (
		<div>
			Nav
			<SinglePreview />
			<Outlet />
			Footer
		</div>
	);
};

export default Layout;
