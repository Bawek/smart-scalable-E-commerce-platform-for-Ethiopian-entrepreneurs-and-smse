const express = require('express');
const { registerTemplate, getAllTemplate } = require('../controllers/template.controller');
const upload = require('../config/multer.config')
const router = express.Router()

// Account routes
router.post('/register',upload.single('PreviewImage'), registerTemplate)
router.get('/get-all',getAllTemplate)
module.exports = router 
