const express = require('express');
const { registerMerchant } = require('../../controllers/merchant.controller');

const router = express.Router()

// merchant routes
router.post('/register',registerMerchant)

module.exports = router 
