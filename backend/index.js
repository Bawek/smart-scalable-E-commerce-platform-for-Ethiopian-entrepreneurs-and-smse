const express = require('express')
const httpError = require('./middlewares/httpError')
require('dotenv').config()
// constants 
const PORT = process.env.PORT || 8000
//start the server
const app = express()

//default middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
//app routes
app.get('/', (req, res, next) => {
    sss
    const ma = true
    if (ma) {
        return next(new httpError('this is an error', 400))
    }
    res.send('Hello World')
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
