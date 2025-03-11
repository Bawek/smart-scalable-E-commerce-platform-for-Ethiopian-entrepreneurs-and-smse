const prisma = require("../config/db")
const bcrypt = require('bcryptjs')
const httpError = require("../middlewares/httpError");
const { generateRefreshToken, generateAccessToken } = require("../utils/generateToken");

const registerAccount = async (req, res, next) => {
    const {
        firestName,
        lastName,
        email,
        password
    } = req.body;

    try {
        // Check if the email already exists
        const userAccount = await prisma.account.findFirst({
            where: {
                email: email
            }
        });

        if (userAccount) {
            // If an account exists with the email, return error
            return next(new httpError('Someone has already registered with this email. Please try another email again.', 409));
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        // Register the new account (additional validation as necessary)
        const newAccount = await prisma.account.create({
            data: {
                email,
                password: hashedPassword,
                firestName,
                lastName,
                role: 'MERCHANT'
            }
        });

        // Success: Return the newly created account
        return res.status(201).json({
            message: 'Account registered successfully',
            status: "success",
            account: newAccount
        });

    } catch (error) {
        console.log('Account registration error:', error);
        return next(new httpError('Server error during account registration', 500));
    }
}
const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const accountExist = await prisma.account.findFirst({
            where: {
                email: email
            }
        })
        if (!accountExist) {
            return new httpError('incorrect email. please enter corrrect one or  register Firest', 404)
        }
        const isMatched = await bcrypt.compare(password, accountExist.password)
        if (!isMatched) {
            return new httpError('Incorrect password please enter correct password', 401)
        }
        const userInfo = {
            accountId: accountExist.id,
            role: accountExist.role
        }
        const refreshToken = await generateRefreshToken(userInfo, next)
        const accessToken = await generateAccessToken(userInfo, next)
        await prisma.account.update({
            where: {
                id: accountExist.id
            },
            data: {
                refreshToken
            }
        })
        res.cookie('token', refreshToken, { httpOnly: true, maxAge: 24 * 3600000 })
        res.status(200).json({
            accessToken,
            email: accountExist.email,
            firestName: accountExist.firestName,
            lastName: accountExist.lastName,
            id:accountExist.id,
            status:'success',
            role:accountExist.role
        })
    } catch (error) {
        console.log('Account registration error:', error);
        return next(new httpError('Server error during account registration', 500));
    }

}

const getAllAccounts = async (req, res, next) => {
    try {
        const accounts = await prisma.account.findMany()
        res.status(200).json({ status: 'success', accounts })
    } catch (error) {
        next(new httpError(error.message, 500))
    }

}


module.exports = {
    registerAccount,
    getAllAccounts,
    login
}