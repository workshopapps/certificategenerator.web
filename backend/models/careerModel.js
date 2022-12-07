const mongoose = require("mongoose");
const { Schema } = mongoose;

const CareerSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, "Must provide Job Role"],
      maxlength: [30, "Role can not be more than 30 characters"],
    },
    category: {
      type: String,
      required: [true, "Must provide Job category"],
      maxlength: [30, "category can not be more than 30 characters"],
    },
    location: {
      type: String,
      required: [true, "Must provide Job location"],
      maxlength: [30, "Location can not be more than 30 characters"],
    },
    jobType: {
      type: String,
      required: [true, "Must provide Job Type(Full time or Part-Time"],
    },
    jobDescription: {
      type: String,
      required: [true, "Must provide Job Description"],
    },
    countOfOpening: {
      type: Number,
      required: [true, "Must provide Job count"],
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", CareerSchema);
