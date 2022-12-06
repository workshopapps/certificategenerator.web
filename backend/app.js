/**
 * app.js can be used to clean up the index file,
 * removing all the cluter from the imports
 * app can be imported and be made to listen on the required port
 * via
 * app.listen(port,()=>{})
 *
 */
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// Note: You MUST import the package in some way for tracing to work
const fileUpload = require("express-fileupload");

const app = express();
Sentry.init({
  dsn: "https://d2d07df84791475d88af3fefacd6ce35@o4504279338647552.ingest.sentry.io/4504279342841857",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

//import custom routes
const auth = require("./routes/authRouter");
const csvRouter = require("./routes/csvRouter.js");
const blog = require("./routes/blogPostRouter");
const certificate = require("./routes/certificateRouter");
const downloadCsv = require("./routes/downloadRouter");
const careers = require("./routes/careerRouter");
const mailingLists = require("./routes/mailingListRouter");
const profileRouter = require("./routes/profileRouters");
const contacts = require("./routes/contactRouter");
const pricing = require("./routes/pricingRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");


//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Welcome to HNG-Certificate Api");
});

app.use("/api/auth", auth);
app.use("/api/upload/csv", csvRouter);
app.use("/api/blog", blog);
app.use("/api/certificates", certificate);
app.use("/api/download", downloadCsv);
app.use("/api/careers", careers);
app.use("/api/mailinglists", mailingLists);
app.use("/api/profile/", profileRouter);
app.use("/api/contactus", contacts);
app.use("/api/pricing", pricing);
app.use("/api/profile/", profileRouter);
app.use("/api/contactus", contacts);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
