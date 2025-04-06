const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerMerchant = async (req, res, next) => {
    console.log('merchant')
    const {
        accountId,
        locationId,
        businessName,
        ownerName,
        businessPhone,
        bussinessEmail,
        cbeAccountNo,
        businessType,
    } = req.body
    if (!req.file) return next(new httpError("Sorry Your Identity Card is Required."))

    console.log('merchant', req.body)
    try {
        const merchant = await prisma.merchant.findFirst({
            where: {
                AND: {
                    businessName,
                    businessPhone,
                    bussinessEmail,
                    cbeAccountNo
                }
            }
        })
        if (merchant) {
            // If an account exists with the email, return error
            return next(new httpError('Someone has already registered with this Account. Please try again.', 409));
        }
        // Register the new account (additional validation as necessary)
        const newMerchant = await prisma.merchant.create({
            data: {
                accountId,
                identityCard: req.file.filename,
                locationId,
                businessName,
                ownerName,
                businessPhone,
                bussinessEmail,
                cbeAccountNo,
                businessType
            }
        });

        // Success: Return the newly created account
        return res.status(201).json({
            message: 'merchant registered successfully',
            status: "success",
            merchant: newMerchant
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}

const registerMyMerchant = async (req, res, next) => {
    const {
        id,
        name,
        age
    } = req.body
    console.log('unitl here')
    try {
        const newMerchant = await prisma.myMerchant.create({
            data: {
                id,
                name,
                age
            }
        });

        // Success: Return the newly created account
        return res.status(201).json({
            message: 'merchant registered successfully',
            status: "success",
            merchant: newMerchant
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getMyMerchant = async (req, res, next) => {
    try {
        const merchant = await prisma.merchant.findMany()

        // Success: Return the newly created account
        return res.status(201).json({
            message: 'merchant registered successfully',
            status: "success",
            merchant
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}

module.exports = {
    registerMerchant,
    registerMyMerchant,
    getMyMerchant
}