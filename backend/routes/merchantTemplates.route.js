const express = require('express');
const { changeTemplate, getAllMerchantTemplates, getMerchantTemplateByDomain } = require('../controllers/merchantTemplates.controller');


const router = express.Router()
router.get('/change-template/:id', changeTemplate)
router.get('/get-all', getAllMerchantTemplates)
router.get('/merchant-template/:domain', getMerchantTemplateByDomain)

// Account routes
module.exports = router 
