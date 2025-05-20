const express = require('express');
const { createProduct, getProductById, getAllProducts, updateProductById, deleteProductById } = require('../controllers/product.controller');
const upload = require('../config/multer.config');

const router = express.Router()

// Account routes
router.post('/create',upload.single('images'), createProduct) 
router.get('/get-all-products', getAllProducts) 
router.get('/product-get-by-id/:id', getProductById) 
router.delete('/delete/:id', deleteProductById) 
router.put('/update',upload.single('images'), updateProductById) 
 
module.exports = router 
