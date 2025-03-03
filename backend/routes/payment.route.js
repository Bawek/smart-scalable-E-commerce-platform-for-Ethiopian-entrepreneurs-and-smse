const express = require('express');
const { chapaPayment } = require('../controllers/payment.controller');

const router = express.Router()

// Account routes
router.post('/pay-check', chapaPayment)
  
module.exports = router 
