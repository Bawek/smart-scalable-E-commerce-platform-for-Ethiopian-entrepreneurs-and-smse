const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/pay', paymentController.createPayment);
router.get('/verify/:tx_ref', paymentController.verifyPayment);

module.exports = router;
