const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { parseTemplate } = require("../utils/templates");

const TemplateSchema = new mongoose.Schema({
  fontUrl: { type: String, required: true },
  texts: [
    {
      text: {
        type: String,
        required: function () {
          return !this.isAttribute;
        }
      },
      top: { type: Number, required: true },
      left: { type: Number, required: true },
      width: Number,
      fontWeight: Number,
      fontFamily: { type: String, required: true },
      fontSize: { type: Number, required: true },
      color: String,
      isAttribute: { type: Boolean, default: false },
      attribute: {
        type: String,
        enum: [
          "name",
          "nameoforganization",
          "description",
          "award",
          "signed",
          "date",
          "uuid",
          "link"
        ], // Complete this later
        required: function () {
          return this.isAttribute;
        }
      }
    }
  ],
  elements: [
    {
      url: {
        type: String,
        required: function () {
          return !this.isLogo;
        }
      },
      top: { type: Number, required: true },
      left: { type: Number, required: true },
      width: Number,
      height: {
        type: Number,
        required: function () {
          return !this.width;
        }
      },
      isLogo: { type: Boolean, default: false }
    }
  ],
  raw: String,
  backgroundImage: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// Instance method to format template correctly
TemplateSchema.methods.format = function () {
  return {
    _id: this._id,
    backgroundImage: this.backgroundImage,
    userId: this.userId,
    texts: this.texts,
    elements: this.elements,
    fontUrl: this.fontUrl
  };
};

TemplateSchema.pre("save", async function (next) {
  try {
    // Convert template to raw template string
    const raw = await parseTemplate(this);

    // Store raw template in the database
    this.raw = raw;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Template", TemplateSchema);
