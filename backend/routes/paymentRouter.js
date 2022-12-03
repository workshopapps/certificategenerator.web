const express = require("express");
const router = express.Router();

const { initializePayment, verifyPayment } = require('../controllers/paymentController')

// initialize payment
router.post('/paystack/pay', initializePayment)

// verify payment
router.get('/paystack/callback', verifyPayment)

module.exports = router;