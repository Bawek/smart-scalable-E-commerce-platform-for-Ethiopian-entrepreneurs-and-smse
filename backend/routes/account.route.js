const express = require('express');
const { registerAccount, getAllAccounts } = require('../controllers/account.controller');

const router = express.Router()

// Account routes
router.post('/register',registerAccount)
router.get('/get-all',getAllAccounts)
module.exports = router 
