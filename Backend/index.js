require('dotenv').config();
require("express-async-errors")
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');

const app = express()

//import coustom middlware
const connectDB = require('./utils/dbConn');

//import custom routes
const auth = require('./routes/authRouter')
const csvRouter = require('./routes/csvRouter.js');
const blog = require('./routes/blogPostRouter')
// const blog = require('./routes/blogPostRouter');
const certificate = require('./routes/certificateRouter');
const downloadCsv = require('./routes/downloadRouter');
const careers = require('./routes/careerRouter')
const mailingLists = require('./routes/mailingListRouter')
const pricing = require('./routes/pricingRouter')
const PORT = process.env.PORT || 5000;

connectDB();





//middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Welcome to HNG-Certificate Api');
});

app.use('/api/auth', auth)
app.use('/api/upload/csv', csvRouter);
app.use('/api/blog', blog);
app.use('/api/certificates', certificate)
app.use('/api/download', downloadCsv)
app.use('/api/careers',careers)
app.use('/api/mailinglists',mailingLists)
app.use('/api/pricing', pricing)


mongoose.connection.once('open', () => {
  console.log('Connected to DB')
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})