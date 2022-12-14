const express = require("express")
const router = express.Router()
const { 
    updateUserPlan, 
} = require("../controllers/pricingPlanController");
const authentication = require("../middleware/authentication");


router.put('/', authentication, updateUserPlan)

module.exports = router;