require('dotenv').config();
require("express-async-errors");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');

const app = express();



//import coustom middlware
const connectDB = require("./utils/dbConn");

//import custom routes
require('./routes/sendCertificateRouter')(app)
const auth = require("./routes/authRouter");
const csvRouter = require("./routes/csvRouter.js");
const blog = require("./routes/blogPostRouter");
const certificate = require("./routes/certificateRouter");
const downloadCsv = require("./routes/downloadRouter");
const careers = require("./routes/careerRouter");
const applyCareer = require('./routes/applyCareerRouter')
const teamRoute = require("./routes/teamRoutes");
const mailingLists = require("./routes/mailingListRouter");
// require('./routes/emailNotificationRouter')(app)
const profileRouter = require("./routes/profileRouters");
const contacts = require('./routes/contactRouter');
const userPlan = require('./routes/pricingPlanRouter');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const eventRouter = require("./routes/eventRouter");
const template = require("./routes/templateRouter");

const PORT = process.env.PORT || 5000;

connectDB();

//middleware
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
  useTempFiles: true
}));


app.get("/", (req, res) => {
  res.send("Welcome to HNG-Certificate Api");
});

app.use("/api/auth", auth);
app.use("/api/upload/csv", csvRouter);
app.use("/api/blog", blog);
app.use("/api/certificates", certificate);
app.use("/api/download", downloadCsv);
app.use("/api/careers", careers);
app.use("/api/applycareers", applyCareer);
app.use("/api/mailinglists", mailingLists);
app.use("/api/profile", profileRouter);
app.use("/api/team", teamRoute);
app.use('/api/contactus', contacts)
app.use('/api/pricing', userPlan)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/api/events", eventRouter);
app.use("/api/templates", template);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
