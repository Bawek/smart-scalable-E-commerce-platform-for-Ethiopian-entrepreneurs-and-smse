const express = require('express');
const { registerAccount, getAllAccounts, login, deleteAccountById } = require('../controllers/account.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router()

// Account routes
router.post('/register', registerAccount)
router.post('/login', login)
router.delete('/delete/:accountId', deleteAccountById)
router.get('/get-all', getAllAccounts)
module.exports = router 
