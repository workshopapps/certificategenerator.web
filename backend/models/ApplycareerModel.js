const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplyCareerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType:{
      type: String,
      required: true,
    },
    unemployed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplyCareer", ApplyCareerSchema);

