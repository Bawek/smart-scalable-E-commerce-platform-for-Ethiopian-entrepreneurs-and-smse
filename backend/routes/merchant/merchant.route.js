const express = require('express');
const { registerMerchant, getAllMerchant } = require('../../controllers/merchant.controller');
const upload = require('../../config/multer.config');

const router = express.Router()

// merchant routes
router.post('/register', upload.single('identityCard'), registerMerchant)
router.get('/get-all', getAllMerchant)

module.exports = router 
