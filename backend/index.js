const express = require('express')
const httpError = require('./middlewares/httpError')
const prisma = require('./config/db')
const { validate } = require('./middlewares/validateMiddleware')
const validationSchema = require('./validations/validationSchema')
const router = require('./routes/user/webhook.route')
// require('dotenv').config()
// constants 
const PORT =  8000

//start the server
const app = express()

//default middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
//app routes
app.use('/api/user',router)
app.post('/',validate(validationSchema.register), async (req, res) => {
    try {
        const { name, email, id } = req.body;
        const newUser = await prisma.user.create({
            data: { name, email, id },
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// handling errors
app.use((err, req, res, next) => {
    console.log(err.isOperational, 'isoperational')
    if (err.isOperational) {
        err.statusCode = err.statusCode || 500
        err.status = err.status || 'error'
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
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
