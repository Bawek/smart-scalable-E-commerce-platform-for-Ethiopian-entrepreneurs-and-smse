const express = require('express')
const { validate } = require('./middlewares/validateMiddleware')
const merchantRouter = require('./routes/merchant/merchant.route')
const accountRouter = require('./routes/account.route')
const cors = require('cors')
const shopRouter = require('./routes/shop.route')
const imageRouter = require('./routes/image.route')
const pagesRouter = require('./routes/pages.route')
const templateRouter = require('./routes/template.route')
const paymentRouter = require('./routes/payment.route')
const cookieParser = require('cookie-parser')
const handleRefreshToken = require('./controllers/refreshToken.controller')
const locationRouter = require('./routes/location.route')
require('dotenv').config
const http = require('http');
const { initialize } = require('./utils/socket')
const { testIo } = require('./controllers/merchant.controller')
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
// constants  
const PORT = process.env.PORT || 8000
//start the server 
const app = express()
const server = http.createServer(app)
initialize(server); // Initialize Socket.IO

//default middleware
// Enable CORS for specific domains
app.use(cors({
    origin: ['http://localhost:3000', 'https://checkout.chapa.co'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))
app.use(cookieParser())
app.use(express.json())

// chapa payment route
app.use('/api', paymentRouter);
app.use('/api/merchant', merchantRouter)
// Accounts route

app.get('/api/refresh-token', handleRefreshToken)

app.use('/api/accounts', accountRouter)
app.use('/api/location', locationRouter)
app.use('/api/shops', shopRouter)
app.use('/api/image', imageRouter)
app.use('/api/pages', pagesRouter)
app.use('/api/templates', templateRouter)
app.post('/iopost', testIo)
// chat
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'user', content: message }
            ]
        });

        const aiReply = completion.choices[0].message;
        res.json({ reply: aiReply });
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});
// handling errors
app.use((err, req, res) => {
    if (err.isOperational) {
        err.statusCode = err.statusCode || 500
        err.status = err.status || 'error'
        console.log(err, 'http Error')
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    else {
        // res.status(500).json({
        //     status: 'error',
        //     message: err.message || 'Something went seriously wrong'
        // })
    }
})
//start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
