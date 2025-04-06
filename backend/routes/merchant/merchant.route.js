const express = require('express');
const { registerMerchant, registerMyMerchant, getMyMerchant } = require('../../controllers/merchant.controller');
const upload = require('../../config/multer.config');

const router = express.Router()

// merchant routes
router.post('/register', upload.single('identityCard'), registerMerchant)
router.post('/regiter-my', registerMyMerchant) 
router.get('/get-mymerchant', getMyMerchant)

module.exports = router 
