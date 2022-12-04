import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import { AppProvider } from "./contexts/AppProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AppProvider >
			<App />
		</AppProvider>
	</React.StrictMode>
);
