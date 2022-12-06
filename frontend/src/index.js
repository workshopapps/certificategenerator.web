import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
//import { BrowserRouter } from "react-router-dom";
import "./index.css"

process.env.NODE_ENV === "production" && Sentry.init({
  dsn: "https://ff49b09dfdb14d119fe71ea3974a9042@o4504279338647552.ingest.sentry.io/4504279342841856",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

reportWebVitals();