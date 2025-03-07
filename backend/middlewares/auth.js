const jwt = require("jsonwebtoken")
const httpError = require("./httpError")

const auth = async (req, res, next) => {
    // extract the header
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) return next(new httpError('header is not set', 403))
    // extract the token
    const token = authHeader.split(' ')[1]
    if (!token) return next(new httpError('There is error on extracting the token', 403))
    try {
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return next(new httpError('The token is expired', 401))
            // add the account to the requist body
            req.body.account = decoded.userInfo
            next()
        })


    } catch (error) {
        console.log('error on the auth', error)
        next(new httpError(error.message, 500))
    }
}


module.exports = {
    auth
}