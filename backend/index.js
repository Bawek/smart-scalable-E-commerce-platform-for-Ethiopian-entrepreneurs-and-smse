const express = require('express')
const httpError = require('./middlewares/httpError')
const prisma = require('./config/db')
const { validate } = require('./middlewares/validateMiddleware')
const validationSchema = require('./validations/validationSchema')
const merchantRouter = require('./routes/merchant/merchant.route')
const accountRouter = require('./routes/account.route')
const cors = require('cors')
const path = require('path')
const shopRouter = require('./routes/shop.route')
const imageRouter = require('./routes/image.route')
const pagesRouter = require('./routes/pages.route')
const templateRouter = require('./routes/template.route')
const paymentRouter = require('./routes/payment.route')
const cookieParser = require('cookie-parser')
const handleRefreshToken = require('./controllers/refreshToken.controller')


require('dotenv').config
// constants  
const PORT = process.env.PORT || 8000

//start the server 
const app = express()
//default middleware
// Enable CORS for specific domains
app.use(cors({
    origin: ['http://localhost:3000', 'https://checkout.chapa.co'],
    credentials: true,
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

