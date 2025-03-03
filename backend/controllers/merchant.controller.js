const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerMerchant = async (req, res, next) => {
    const {
        hasPhysicalStore,
        userId,
        bankAccountNumber,
        physicalShopName,
        physicalShopAddress,
        physicalShopCity,
        physicalShopPhoneNumber,
    } = req.body
    console.log('unitl here')
    try {
        const merchant = await prisma.merchant.findFirst({
            where: {
                userId: userId
            }
        })
        if (merchant) {
            // If an account exists with the email, return error
            return next(new httpError('Someone has already registered with this Account. Please try again.', 409));
        }
        const isBankAccountExit = await prisma.merchant.findFirst({
            where: {
                bankAccountNumber: bankAccountNumber
            }
        })
        // If BankAccount is provided, perform additional checks or logic here
        if (isBankAccountExit) {
            return next(new httpError('This BankNumber is already associated with another account.', 409));

        }
        // // If ShopName is provided, perform additional checks or logic here
        // const isExistphysicalShopName = await prisma.merchant.findFirst({
        //     where: {
        //         physicalShopName: physicalShopName
        //     }
        // })
        // if (isExistphysicalShopName) {
        //     return next(new httpError('This physicalShopName is already associated with another account.', 409));

        // }
        // Register the new account (additional validation as necessary)
        const newMerchant = await prisma.merchant.create({
            data: {
                hasPhysicalStore,
                userId,
                bankAccountNumber,
                physicalShopName,
                physicalShopAddress,
                physicalShopCity,
                physicalShopPhoneNumber
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
        const merchant = await prisma.myMerchant.findMany()

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