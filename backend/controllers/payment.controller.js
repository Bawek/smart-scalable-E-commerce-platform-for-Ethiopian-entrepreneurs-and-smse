// controllers/paymentController.js
const axios = require('axios');

// Chapa API URL and Authorization key
const CHAPA_URL = 'https://api.chapa.co/v1/transaction/initialize';
const CHAPA_AUTH = process.env.CHAPA_SECRET_KEY;  // Store your Chapa secret key in .env

// Payment initialization function
const chapaPayment = async (req, res) => {
    const { amount, email, first_name, last_name, phone_number } = req.body;

    // Ensure all required fields are passed
    if (!amount || !email || !first_name || !last_name || !phone_number) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: amount, email, first_name, last_name, phone_number',
        });
    }

    const TEXT_REF = 'chewatatest-' + Date.now(); // Unique reference for the transaction
    const CALLBACK_URL = 'http://localhost:3000/'; // Callback URL after payment
    const RETURN_URL = 'http://localhost:3000/'; // Return URL after payment

    // Prepare the data to send to Chapa
    const data = {
        amount: amount.toString(),
        currency: 'ETB',
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref: TEXT_REF,
        callback_url: CALLBACK_URL,
        return_url: RETURN_URL,
        "customization[title]": "Payment for my favourite merchant",
        "customization[description]": "I love online payments",
        "meta[hide_receipt]": "true"
    };

    try {
        const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', data, {
            headers: {
                Authorization: `Bearer ${CHAPA_AUTH}`,
                'Content-Type': 'application/json',
            },
        });

        // Redirect to Chapa's checkout URL
        res.redirect(response.data.data.checkout_url);
    } catch (err) {
        console.error('Payment creation failed:', err.response?.data || err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment',
        });
    }
};

// Export the controller function
module.exports = {
    chapaPayment,
};
