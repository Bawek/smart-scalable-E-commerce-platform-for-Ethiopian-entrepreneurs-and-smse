const express = require('express');
const { registerPage, getAllPage, updatePage, getById, deletePageById, getPagesByTemplate } = require('../controllers/pages.controller');

const router = express.Router()

// Account routes
router.post('/register', registerPage)
router.get('/get-all', getAllPage)
router.patch('/update/:pageId', updatePage)   
router.get('/get/:pageId', getById)  
router.get('/get-by-template/:templateId', getPagesByTemplate)  
router.delete('/delete/:pageId', deletePageById)  
module.exports = router 
