const express = require('express');
const { registerTemplate, getAllTemplate, getTemplateById, updateTempalate, deleteById, buyTemplate, getCustomeTemplateById, getAllMerchantTemplate, getMerchantTemplateByAccount } = require('../controllers/template.controller');
const upload = require('../config/multer.config')
const router = express.Router()

// Account routes
router.post('/register', upload.single('PreviewImage'), registerTemplate)
router.get('/get-all', getAllTemplate) 
router.get('/get-all-merchant', getAllMerchantTemplate) 
router.get('/get/:templateId', getTemplateById)
router.get('/get-merchant-by-account/:accountId', getMerchantTemplateByAccount)
router.delete('/delete/:templateId', deleteById)
router.post('/buy/:accountId', buyTemplate)
router.post('/get-merchant-template/:templateId', getCustomeTemplateById) 
router.put('/update/:templateId', upload.single('PreviewImage'), updateTempalate)
module.exports = router 
