const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerMerchant = async (req, res, next) => {
    const { email, clerkId, merchantId } = req.body
    try {
        const userAcounts = await prisma.merchant.findFirst({
            where: {
                clerkId: clerkId
            }
        })
        res.send('yes merchant works')
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}

module.exports = {
    registerMerchant
}