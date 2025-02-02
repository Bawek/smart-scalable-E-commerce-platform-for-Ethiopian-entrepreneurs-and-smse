const express = require('express');
const { saveUserToDatabase } = require('../../controllers/users.controller');
const router = express.Router()

router.post('/webhook', async (req, res) => {
    try {
        const { data, type } = req.body;
console.log(type)
        if (type === "user.created") {
            await saveUserToDatabase(data);
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: "Webhook processing failed" });
    }
})
module.exports = router