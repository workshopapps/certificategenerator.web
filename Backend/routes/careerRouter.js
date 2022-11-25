const express = require('express')
const { createCareer, getAllCareer, getCareer, DeleteCareer, updateCareer } = require('../controllers/careerController')
const router = express.Router()

//create new user information
router.post("/", createCareer)

//get  job information
router.get("/", getAllCareer)

//get particular job information
router.get("/:id", getCareer)

//delete all information job 
router.delete("/:id",DeleteCareer)

//update all information through the body
router.put("/:id", updateCareer)

module.exports = router