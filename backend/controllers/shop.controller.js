const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerShop = async (req, res, next) => {
    const {
        name,
        prviewImage,
        merchant,
    } = req.body
    try {
        // const shop = await prisma.merchant.findFirst({
        //     where: {
        //         userId: ownerId
        //     }
        // })
        // if (!shop) {
        //     // If an account exists with the email, return error
        //     return next(new httpError('Not registered with this Account. Please try again.', 409));
        // }
        // const isShopPresent = await prisma.shop.findFirst({
        //     where: {
        //         name: name
        //     }
        // })
        // // If BankAccount is provided, perform additional checks or logic here
        // if (isShopPresent) {
        //     return next(new httpError('This Name is already associated with another account.', 409));

        // }
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
        const newShop = await prisma.myshop.create({
            data: {
                name,
                prviewImage,
                merchant,
            }
        });

        // Success: Return the newly created account
        return res.status(201).json({
            message: 'merchant registered successfully',
            status: "success",
            shop: newShop
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getAllShop = async (req, res, next) => {
    try {
        const shops = await prisma.myshop.findMany()
        res.status(200).json(shops)
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}
const getById = async (req, res, next) => {
    const {shopId} = req.params
    console.log(shopId,'shopId')
    try {
        const pages = await prisma.page.findMany()
        const shop = await prisma.myshop.findFirst({
            where: {
                id: Number(shopId)
            },
        })
        res.status(200).json({shop,pages})
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}

module.exports = {
    registerShop,
    getAllShop,
    getById
}