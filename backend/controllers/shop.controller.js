const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerShop = async (req, res, next) => {
    const {
        accountId,
        name,
        slug,
        description,
        merchantTemplateId
    } = req.body
    console.log(req.body, 'shop body')
    if (!req.file) return next(new httpError("Sorry Your logo is Required."))
    try {
        const merchant = await prisma.merchant.findFirst({
            where: {
                accountId: accountId
            }
        })
        if (!merchant) {
            // If an merchant not exists with the name, return error
            return next(new httpError('Please First Register as merchant to do so. Please try again.', 409));
        }
        const shop = await prisma.shop.findFirst({
            where: {
                name: name
            }
        })
        if (shop) {
            // If an shop exists with the name, return error
            return next(new httpError('Someone has already registered with this Name. Please try again.', 409));
        }
        const newShop = await prisma.shop.create({
            data: {
                name: merchant.businessName,
                slug,
                description,
                merchantId: merchant.id,
                logoImageUrl: req.file.filename,
                locationId: merchant.locationId,
                merchantTemplateId
            }
        });
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
        // await prisma.shop.deleteMany()
        const shops = await prisma.shop.findMany()
        if (shops.length === 0) {
            return res.status(200).json({
                status: 'success',
                shops: []
            })
        }
        res.status(200).json({
            status: 'success',
            shops
        })
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}
const getById = async (req, res, next) => {
    const { shopId } = req.params
    console.log(shopId, 'shopId')
    try {
        const pages = await prisma.page.findMany()
        const shop = await prisma.myshop.findFirst({
            where: {
                id: Number(shopId)
            },
        })
        res.status(200).json({ shop, pages })
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}
const getShopByAccount = async (req, res, next) => {
    const { accountId } = req.params
    console.log(accountId, 'shopId')
    try {
        const merchant = await prisma.merchant.findFirst()
        if (!merchant) {
            return res.status(404).json({
                status: 'Success',
                merchant: {}
            })
        }
        const shop = await prisma.shop.findFirst({
            where: {
                merchantId: merchant.id
            },
        })

        res.status(200).json({
            status: 'success',
            shop: shop ? shop : {}
        })
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}

module.exports = {
    registerShop,
    getAllShop,
    getById,
    getShopByAccount
}