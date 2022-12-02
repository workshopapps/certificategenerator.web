const express = require("express")
const router = express.Router()
const { 
    updateUserPlan, 
} = require("../controllers/pricingPlanController")


router.route("/:id")
    .put(updateUserPlan)

module.exports = router