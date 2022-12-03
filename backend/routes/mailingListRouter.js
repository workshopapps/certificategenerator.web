const express = require('express')
const { createMailing, getAllMailing, DeleteMaling } = require('../controllers/mailingListController')

const router = express.Router()

//create new mailing
router.post("/", createMailing)

//get all mailing
router.get("/", getAllMailing)

//delete a maling 
router.delete("/:id", DeleteMaling)



module.exports = router