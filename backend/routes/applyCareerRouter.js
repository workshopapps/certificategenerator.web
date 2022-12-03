const express = require('express')
const { newApplication, getAllApplication, getApplication, DeleteApplication } = require('../controllers/applyCareerController')
const router = express.Router()

//create new user information
router.post("/", newApplication)

//get  job information
router.get("/", getAllApplication)

//get particular job information
router.get("/:id", getApplication)

//delete all information job 
router.delete("/:id", DeleteApplication)



module.exports = router