const express = require('express');
const { registerAccount, getAllAccounts, login, deleteAccountById, logout, updateById, updateAccount } = require('../controllers/account.controller');
const { auth } = require('../middlewares/auth');
const upload = require('../config/multer.config');

const router = express.Router()
// Account routes 
router.post('/register', registerAccount)
router.post('/login', login)
router.post('/logout', logout)
router.post('/update-role/:accountId', updateById)
router.post('/update/:accountId', upload.single('profileImage'), updateAccount)
router.delete('/delete/:accountId', deleteAccountById)
router.get('/get-all', getAllAccounts)
module.exports = router 
