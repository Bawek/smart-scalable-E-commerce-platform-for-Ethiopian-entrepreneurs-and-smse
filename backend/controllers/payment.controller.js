const express = require("express");
const app = express();
const axios = require("axios").default;
require("dotenv").config();

const PORT = process.env.PORT || 4400;
const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_SECRET_KEY;  // Your Chapa secret key

app.set("view engine", "ejs");

// req header with Chapa secret key
const config = {
    headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
    },
};

// Entry for the front-end
app.get("/", (req, res) => {
    res.render("index");
});

// Initial payment endpoint
app.post("/api/pay", async (req, res) => {
    const { amount, email, phone_number } = req.body;

    // Chapa redirect you to this URL when the payment is successful
    const CALLBACK_URL = `${process.env.BASE_URL}/api/system-admin/2`; // Your callback URL
    const RETURN_URL = "http://localhost:4400/api/payment-success/";

    // Unique reference given to every transaction
    const TEXT_REF = "tx-myecommerce12345-" + Date.now();

    // Prepare the data to send to Chapa
    const data = {
        amount,
        currency: "ETB", // Ethiopian Birr
        email,
        phone_number,
        tx_ref: TEXT_REF,
        callback_url: CALLBACK_URL,
        return_url: RETURN_URL,
    };

    // Send POST request to Chapa
    try {
        const response = await axios.post(CHAPA_URL, data, config);
        // Redirect to Chapa's checkout URL
        res.redirect(response.data.data.checkout_url);
    } catch (err) {
        console.error("Payment creation failed:", err.response?.data || err.message);
        res.status(500).json({
            success: false,
            message: "Failed to create payment",
        });
    }
});

// Payment verification endpoint
app.get("/api/verify-payment/:id", async (req, res) => {
    try {
        // Verify the transaction with Chapa
        const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${req.params.id}`, config);
        console.log("Payment was successfully verified", response.data);
        // You can process the response to update your database
    } catch (err) {
        console.error("Payment can't be verified", err);
    }
});

// Success page after payment
app.get("/api/payment-success", (req, res) => {
    res.render("success");
});

app.listen(PORT, () => console.log("Server listening on port:", PORT));

