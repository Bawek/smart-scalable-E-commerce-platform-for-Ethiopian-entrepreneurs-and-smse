const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerAccount = async (req, res, next) => {
    const { email, clerkId, merchantId } = req.body;

    try {
        // Check if the email already exists
        const userAccount = await prisma.account.findFirst({
            where: {
                email: email
            }
        });

        if (userAccount) {
            // If an account exists with the email, return error
            return next(new httpError('Someone has already registered with this email. Please try again.', 409));
        }

        // If clerkId is provided, perform additional checks or logic here
        if (clerkId) {
            // Handle logic for clerkId validation or other operations
            // Example: Check if the clerkId is already associated with a user
            const clerkAccount = await prisma.account.findFirst({
                where: {
                    clerkId: clerkId
                }
            });

            if (clerkAccount) {
                return next(new httpError('This clerk ID is already associated with another account.', 409));
            }
        }

        // Register the new account (additional validation as necessary)
        const newAccount = await prisma.account.create({
            data: {
                email: email,
                clerkId: clerkId,
                merchantId: merchantId

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
    getAllAccounts
}