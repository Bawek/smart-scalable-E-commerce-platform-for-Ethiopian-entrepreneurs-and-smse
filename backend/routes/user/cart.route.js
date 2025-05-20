const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cart.controller.js')

// POST /api/cart/add
router.post('/add', cartController.addToCart)

// GET /api/cart/:userId
router.get('/:userId', cartController.getCart)

// DELETE /api/cart/remove
router.delete('/remove', cartController.removeFromCart)

module.exports = router
