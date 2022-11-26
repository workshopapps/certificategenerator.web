const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new mongoose.Schema({
<<<<<<< HEAD
   user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
   avatar: {
      type: String,
   },
   name: {
      type: String,
      required: [true, 'Must provide your name!']
   },
   job: {
      type: String,
      required: [true, 'Must provide a job!']
   },
   location: {
      type: String,
      required: [true, 'Must provide a location']
   },
   email: {
      type: String,
      required: [true, 'Must provide a valid email address!'],
      unique: true
   },
   phoneNumber: {
      type: String,
      required: [true, 'Must provide a valid phone number!'],
=======
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Must provide your name!"],
  },
  job: {
    type: String,
    required: [true, "Must provide a job!"],
  },
  location: {
    type: String,
    required: [true, "Must provide a location"],
  },
  email: {
    type: String,
    required: [true, "Must provide a valid email address!"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Must provide a valid phone number!"],
  },
});
>>>>>>> 86ad619ae164b2daf428c9dd9ef3f438e9e60dca

module.exports = mongoose.model("Profile", ProfileSchema);
