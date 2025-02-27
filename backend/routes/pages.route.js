const express = require('express');
const { registerPage, getAllPage, updatePage, getById } = require('../controllers/pages.controller');

const router = express.Router()

// Account routes
router.post('/register', registerPage)
router.get('/get-all', getAllPage)
router.patch('/update/:pageId', updatePage) 
router.get('/get/:pageId', getById) 
module.exports = router 
