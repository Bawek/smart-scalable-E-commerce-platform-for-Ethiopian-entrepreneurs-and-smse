const express = require('express');
const { registerMerchant, registerMyMerchant, getMyMerchant } = require('../../controllers/merchant.controller');

const router = express.Router()

// merchant routes
router.post('/register',registerMerchant)
router.post('/regiter-my',registerMyMerchant)
router.get('/get-mymerchant',getMyMerchant)

module.exports = router 
