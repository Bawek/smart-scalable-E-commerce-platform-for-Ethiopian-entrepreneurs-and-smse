const express = require('express');
const { registerShop, getAllShop, getById } = require('../controllers/shop.controller');

const router = express.Router()

// Account routes
router.post('/register', registerShop)
router.get('/get-all', getAllShop)
router.get('/get/:shopId', getById)
module.exports = router

