const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerShop = async (req, res, next) => {
    const {
        merchantId,
        name,
        slug,
        description,
    } = req.body
    if (!req.file) return next(new httpError("Sorry Your logo is Required."))
    try {
        const merchant = await prisma.merchant.findFirst({
            where: {
                id: merchantId
            }
        })
        if (!merchant) {
            // If an shop exists with the name, return error
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
                logoImageUrl: req.file.filename,
                merchant: {
                    connect: { id: merchantId }
                },
                location: {
                    connect: {
                        id: merchant.locationId
                    }
                }
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
        const shops = await prisma.myshop.findMany()
        res.status(200).json(shops)
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