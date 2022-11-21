const mongoose = require("mongoose");
const { Schema } = mongoose;

const mailListSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Must provide Email Address"],
      maxlength: [40, "Email address can not be more than 40 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MailingList", mailListSchema);
