const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const createProduct = async (req, res, next) => {
    const {
        name,
        description,
        price,
        discountPrice,
        quantity,
        category,
        tags,
        status,
        images,
        brand,
        videoUrl,
        slug,
        shopId,
        accountId
    } = req.body
    console.log(req.files)
    if (!req.file) {
        return next(new httpError("Product Image is required for registration.", 400));
    }
    if (name === "" || price === " ") {
        console.log("empty comes")
        return next(new httpError("Sorry All Fields are Required.", 403))
    }
    try {
        const merchant = await prisma.merchant.findFirst({
            where: {
                accountId
            },
            include: {
                shops: true
            }
        })
        // check precence 
        const product = await prisma.product.findFirst({
            where: {
                name
            }
        })
        console.log(merchant.shops[0].id, 'shops of manner')
        if (product) return next(new httpError("Sorry Product is Allready Registred.", 409))
        // Register the new account (additional validation as necessary)
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                discountPrice: Number(price),
                quantity: Number(price),
                category,
                tags: [tags],
                status,
                images: [req?.file?.filename],
                brand,
                videoUrl,
                slug,
                shopId: merchant.shops[0].id
            }
        });

        // Success: Return the newly created account
        return res.status(201).json({
            message: 'merchant registered successfully',
            status: "success",
            product: newProduct,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getAllProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany()
        return res.status(201).json({
            status: "success",
            products,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getProductById = async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })
        if (!product) return next(new httpError("Sorry No Product with this Id.", 404))

        // Success: Return the newly created account
        return res.status(200).json({
            status: "success",
            product,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const deleteProductById = async (req, res, next) => {
    const { id } = req.params
    try {
        await prisma.product.delete({
            where: {
                id
            }
        })

        // Success: Return the newly created account
        return res.status(204).json({
            status: "success",
            message: 'Product Successfully Deleted',
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const updateProductById = async (req, res, next) => {
    const {
        name,
        description,
        price,
        discountPrice,
        quantity,
        category,
        tags,
        status,
        images,
        brand,
        videoUrl,
        slug,
        shopId,
        accountId,
        id
    } = req.body
    try {
        if (!req.file) {
            return next(new httpError("Product Image is required for registration.", 400));
        }
        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                price: Number(price),
                discountPrice: Number(price),
                quantity: Number(price),
                category,
                tags: [tags],
                status,
                images: [req?.file?.filename],
                brand,
                videoUrl,
                slug,
            }
        })
        // Success: Return the newly created account
        return res.status(200).json({
            message: 'Succefully update the product',
            status: "success",
            product,
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
