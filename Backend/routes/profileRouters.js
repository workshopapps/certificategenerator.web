const express = require('express')
const router = express.Router()

const {
  createUserProfile,
  updateUserProfile,
  getUserProfile,
  deleteUserProfile

} = require('../controllers/profileController')



// for getting each user profile
router.get('/:id', getUserProfile)

// for creating each user profile
router.post('/', createUserProfile)

// to for update a user's profile
router.put('/:id', updateUserProfile)

// to delete a user profile
router.delete('/:id', deleteUserProfile)


module.exports = router