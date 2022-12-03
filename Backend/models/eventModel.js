const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String,
    requried: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  customURI: {
    type: String,
    required: false,
    unique: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
