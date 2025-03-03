const express = require('express')
const httpError = require('./middlewares/httpError')
const prisma = require('./config/db')
const { validate } = require('./middlewares/validateMiddleware')
const validationSchema = require('./validations/validationSchema')
const merchantRouter = require('./routes/merchant/merchant.route')
const bodyParser = require('body-parser');
const { clerkMiddleware, clerkClient } = require('@clerk/express')
const accountRouter = require('./routes/account.route')
const cors = require('cors')
const path = require('path')
const shopRouter = require('./routes/shop.route')
const imageRouter = require('./routes/image.route')
const pagesRouter = require('./routes/pages.route')
const templateRouter = require('./routes/template.route')
const paymentRouter = require('./routes/payment.route')
require('dotenv').config
// constants  
const PORT = process.env.PORT || 8000

//start the server 
const app = express()
//default middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))
app.use(express.json())
// usage of clark middleware
app.use(clerkMiddleware())
// app Router 
// chapa payment route
app.use('/api/payment', paymentRouter)
app.use('/api/merchant', merchantRouter)
// Accounts route

app.use('/api/accounts', accountRouter)
app.use('/api/shops', shopRouter)
app.use('/api/image', imageRouter)
app.use('/api/pages', pagesRouter)
app.use('/api/templates', templateRouter)
app.get('/', async (req, res) => {
    const users = await clerkClient.users.getUserList({
        limit: 10
    })
    res.status(200).json(users)
})
//app routes

// handling errors
app.use((err, req, res, next) => {
    console.log(err.isOperational, 'isoperational')
    if (err.isOperational) {
        err.statusCode = err.statusCode || 500
        err.status = err.status || 'error'
        console.log(err, 'http Error')
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.log(err, 'critical error')
        res.status(500).json({
            status: 'error',
            message: err.message || 'Something went seriously wrong'
        })
    }
})
//start the server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
// const { Webhook } = require('svix'); // Import Svix for webhook verification

// Middleware to parse raw JSON body for webhook verification
// app.use('/api/users/webhooks', bodyParser.raw({ type: 'application/json' }));
// app.use('/api/users', userRouter)
// app.post('/api/webhooks', async (req, res) => {
//     const SIGNING_SECRET = process.env.SIGNING_SECRET;

//     if (!SIGNING_SECRET) {
//         console.error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env');
//         return res.status(500).json({ success: false, message: 'Server configuration error' });
//     }

//     // Initialize Svix webhook verification
//     const wh = new Webhook(SIGNING_SECRET);

//     // Get headers and body from the request
//     const headers = req.headers;
//     const payload = req.body;

//     const svix_id = headers['svix-id'];
//     const svix_timestamp = headers['svix-timestamp'];
//     const svix_signature = headers['svix-signature'];

//     // Check if Svix headers are missing
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//         return res.status(400).json({ success: false, message: 'Error: Missing Svix headers' });
//     }

//     let evt;

//     try {
//         // Verify the webhook using Svix
//         evt = wh.verify(payload, {
//             'svix-id': svix_id,
//             'svix-timestamp': svix_timestamp,
//             'svix-signature': svix_signature,
//         });
//     } catch (err) {
//         console.error('Error: Could not verify webhook:', err.message);
//         return res.status(400).json({ success: false, message: err.message });
//     }

//     // Extract data from the webhook
//     const { id } = evt.data;
//     const eventType = evt.type;

//     console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//     console.log('Webhook payload:', evt.data);

//     res.status(200).json({ success: true, message: 'Webhook received' });
// });
