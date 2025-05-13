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
                firstName:firestName,
                lastName,
            }
        });
        const userInfo = {
            accountId: newAccount.id,
            role: newAccount.role
        }
        const refreshToken = await generateRefreshToken(userInfo, next)
        const accessToken = await generateAccessToken(userInfo, next)
        const updatedAccount = await prisma.account.update({
            where: {
                id: newAccount.id
            },
            data: {
                refreshToken
            }
        })
        res.cookie('token', refreshToken, { httpOnly: true, maxAge: 24 * 3600000 })
        // Success: Return the newly created account
        return res.status(201).json({
            message: 'Account registered successfully',
            status: "success",
            accessToken,
            email: updatedAccount.email,
            firestName: updatedAccount.firstName,
            lastName: updatedAccount.lastName,
            id: updatedAccount.id,
            status: 'success',
            role: updatedAccount.role,
            id: updatedAccount.id
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
            firestName: accountExist.firstName,
            lastName: accountExist.lastName,
            id: accountExist.id,
            status: 'success',
            role: accountExist.role,
            id: accountExist.id
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
        console.log(error)
        next(new httpError(error.message, 500))
    }

}
const updateById = async (req, res, next) => {
    const { accountId } = req.params
    try {
        const accounts = await prisma.account.update({
            where: {
                id: accountId
            },
            data: {
                role: 'ADMIN'
            }
        })

        res.status(200).json({ status: 'success', accounts })
    } catch (error) {
        console.log(error)
        next(new httpError(error.message, 500))
    }

}
const updateAccount = async (req, res, next) => {
    try {
        const { accountId } = req.params;
        console.log(accountId)
        const account = await prisma.account.findFirst({
            where: {
                id: accountId
            }
        })
        if (!account) return next(new httpError('no account with this Id', 404))
        // Handle file upload if exists
        let profileUrl;
        if (req.file) {
            profileUrl = req.file.filename;
        }
        let ispasswordAsked = false
        if (req.body.newPassword) {
            const isMatched = await bcrypt.compare(req.body.currentPassword, account.password)
            if (!isMatched) {
                return res.status(401).json({
                    message: "Sorry the Password is Not Correct Please Corrct Previous password",
                    status: 'error'
                })
            }
            ispasswordAsked = true
        }
        // Prepare update data
        const updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            ...(profileUrl && { profileUrl }), // Only add if exists
            ...(ispasswordAsked && {
                password: await bcrypt.hash(req.body.newPassword, 10)
            })
        };
        // Update account with Prisma
        const updatedAccount = await prisma.account.update({
            where: { id: accountId },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileUrl: true,
                role: true,
            }
        });

        res.status(200).json({
            status: 'success',
            data: updatedAccount,
            message: 'Your Account updated'
        });

    } catch (error) {
        // Handle specific Prisma errors
        console.log(error)
        if (error.code === 'P2025') {
            return res.status(404).json({
                status: 'error',
                message: 'Account not found'
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }

        // Generic error handler
        res.status(500).json({
            status: 'error',
            message: 'Failed to update account'
        });
    }
};
const deleteAccountById = async (req, res, next) => {
    const { accountId } = req.params;
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId,
            },
        });

        if (!account) return next(new httpError("account is Not Found", 404))
        await prisma.account.delete({
            where: {
                id: accountId
            }
        })
        return res.status(200).json({
            status: 'success',
            message: 'Successfully deleted.',
        });
    } catch (error) {
        console.log('Get account Error', error);
        next(new httpError(error.message, 500));
    }
};
const logout = async (req, res, next) => {
    try {
        // Clear the auth cookie
        res.clearCookie('token', {
            httpOnly: true,
        });

        return res.status(200).json({
            status: 'success',
            message: 'Logged out successfully.',
        });
    } catch (error) {
        console.log('Logout Error:', error);
        next(new httpError(error.message, 500));
    }
};

module.exports = {
    registerAccount,
    getAllAccounts,
    deleteAccountById,
    login,
    logout,
    updateById,
    updateAccount
}