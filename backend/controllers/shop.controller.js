const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerShop = async (req, res, next) => {
    const {
        name,
        prviewImage,
        merchant,
    } = req.body
    try {
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