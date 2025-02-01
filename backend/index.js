const express = require('express')
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

//start the server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
