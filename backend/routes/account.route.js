const express = require('express');
const { registerAccount, getAllAccounts, login } = require('../controllers/account.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router()

// Account routes
router.post('/register', registerAccount)
router.post('/login', login)
router.get('/get-all', auth, getAllAccounts)
module.exports = router 
