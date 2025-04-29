const express = require('express');
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

const router = express.Router()
// Account routes 
router.post('/register', registerAccount)

module.exports = router 
