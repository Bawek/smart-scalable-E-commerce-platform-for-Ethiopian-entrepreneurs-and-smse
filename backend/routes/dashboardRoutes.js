const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/dashboard.controller');

router.get('/analytics', getAnalytics);

module.exports = router;
