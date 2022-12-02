const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userPlanSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("UserPlan", userPlanSchema)