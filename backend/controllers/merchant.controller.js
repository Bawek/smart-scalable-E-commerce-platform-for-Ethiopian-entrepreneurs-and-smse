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
// get all merchants
const getAllMerchant = async (req, res, next) => {
    try {
        const merchant = await prisma.merchant.findMany({
            include: {
                account: true
            }
        })

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
const getMerchantById = async (req, res, next) => {
    const { merchantId } = req.params;
    try {
        const merchant = await prisma.merchant.findUnique({
            where: {
                id: merchantId,
            },
            include: {
                account: true, // Include related account information
                location:true //Include his locations
            },
        });

        if (!merchant) return next(new httpError("Merchant is Not Found", 404))
        return res.status(200).json({
            status: 'success',
            merchant,
        });
    } catch (error) {
        console.log('Get Merchant Error', error);
        next(new httpError(error.message, 500)); 
    }
};


module.exports = {
    registerMerchant,
    getAllMerchant,
    getMerchantById
}