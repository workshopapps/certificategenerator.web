const express = require('express')
const router = express.Router()
const auth = require('../middleware/authentication')

const {
  createUserProfile,
  // updateUserProfile,
  getUserProfile,
  // deleteUserProfile

} = require('../controllers/profileController')



// for getting each user profile
router.get('/',auth, getUserProfile)

// for creating each user profile
router.post('/', auth, createUserProfile)

// to for update a user's profile
// router.put('/', auth, updateUserProfile)

// to delete a user profile
// router.delete('/', auth, deleteUserProfile)


module.exports = router
