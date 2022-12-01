const express = require("express")
const router = express.Router()
const { 
    getAllUsersPlan, 
    getUserPlan, 
    createUserPlan, 
    updateUserPlan, 
    deleteUserPlan 
} = require("../controllers/pricingPlanController")


router.route("/")
    .get(getAllUsersPlan)
    .post(createUserPlan)


router.route("/:id")
    .get(getUserPlan)
    .put(updateUserPlan)
    .delete(deleteUserPlan)

module.exports = router