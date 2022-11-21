require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const app = express()

//import coustom middlware
const connectDB = require('./utils/dbConn');

//import custom routes
const csvRouter = require('./routes/csvRouter.js');

const PORT = process.env.PORT || 5000;

connectDB();





//middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Welcome to HNG-Certificate Api');
});
  
  app.use('/api/upload/csv', csvRouter);
  


mongoose.connection.once('open', ()=> {
  console.log('Connected to DB')
  app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
})