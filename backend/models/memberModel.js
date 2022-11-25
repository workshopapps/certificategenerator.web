const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "member",
    },
    avatar: {
      type: String,
      default: "",
    },
    stack: {
      required: true,
      type: String,
      enum: ["backend", "frontend", "marketing", "design", "product manager"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Member", memberSchema);
