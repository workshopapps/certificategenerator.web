/* eslint-disable linebreak-style */
const { Schema, model } = require("mongoose");

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

const Member = model("Member", memberSchema);

module.exports = Member;
