const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PricingSchema = new Schema({
    type: {
        required: true,
        type: String,
        trim: true
    },
    price: {
        required: true,
        type: Number,
        trim: true
    },
    description: {
        required: true,
        type: String,
        trim: true
    }
})

module.exports = mongoose.model("Plan", PricingSchema)