const prisma = require("../config/db")
const httpError = require("../middlewares/httpError");
const { getIO } = require("../utils/socket");
const testIo = async (req, res) => {
    try {
        const io = getIO();
        const data = req.body;
        io.to('admin-room').emit('new-merchant', data);

        res.status(200).json({
            success: true,
            message: 'Notification triggered'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
const registerMerchant = async (req, res, next) => {
    const {
        mode,
        merchantId,
        accountId,
        locationId,
        businessName,
        ownerName,
        businessPhone,
        bussinessEmail,
        cbeAccountNo,
        businessType,
    } = req.body;
    console.log(req.body)

    if (!req.file && mode === "register") {
        return next(new httpError("Sorry, Your Identity Card is Required."));
    }

    try {
        const io = getIO();

        // Duplicate check only for registration
        if (mode === 'register') {
            const merchant = await prisma.merchant.findFirst({
                where: {
                    OR: [
                        { businessName },
                        { businessPhone },
                        { bussinessEmail },
                        { cbeAccountNo }
                    ]
                }
            });

            if (merchant) {
                return next(new httpError('Someone has already registered with this account. Please try again.', 409));
            }

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

            const YMerchant = await prisma.merchant.findUnique({
                where: { id: newMerchant.id },
                include: { account: true }
            });

            // Notify admin
            io.to('admin-room').emit('new-merchant', {
                message: 'New merchant registration pending approval',
                merchantId: YMerchant.id,
                businessName: YMerchant.businessName,
                timestamp: new Date()
            });

            return res.status(201).json({
                message: 'Merchant registered successfully',
                status: "success",
                merchant: YMerchant
            });

        }
        else if (mode === 'update') {
            // Find merchant by accountId
            const existingMerchant = await prisma.merchant.findFirst({
                where: { accountId }
            });
            if (!existingMerchant) {
                return next(new httpError("Merchant not found for the provided account.", 404));
            } 

            const updateData = {
                accountId,
                locationId,
                businessName,
                ownerName,
                businessPhone,
                bussinessEmail,
                cbeAccountNo,
                businessType
            };

            if (req.file) {
                updateData.identityCard = req.file.filename;
            }

            // Update the merchant
            const updatedMerchant = await prisma.merchant.update({
                where: { id: existingMerchant.id },
                data: updateData
            });

            const merchantWithAccount = await prisma.merchant.findUnique({
                where: { id: updatedMerchant.id },
                include: { account: true }
            });

            // Notify admin about update (or optionally notify merchant)
            io.to('admin-room').emit('new-merchant', {
                message: 'Merchant account has been updated and pending re-approval',
                merchantId: merchantWithAccount.id,
                businessName: merchantWithAccount.businessName,
                timestamp: new Date()
            });

            return res.status(200).json({
                message: 'Merchant updated successfully',
                status: "success",
                merchant: merchantWithAccount
            });
        }

        else {
            return next(new httpError("Invalid mode. Must be 'register' or 'update'.", 400));
        }

    } catch (error) {
        console.error('Register/Update Merchant Error:', error);
        next(new httpError(error.message, 500));
    }
};

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
                location: true //Include his locations
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
const deleteMerchantById = async (req, res, next) => {
    const { merchantId } = req.params;
    try {
        const merchant = await prisma.merchant.findUnique({
            where: {
                id: merchantId,
            },
        });

        if (!merchant) return next(new httpError("Merchant is Not Found", 404))
        await prisma.merchant.delete({
            where: {
                id: merchantId
            }
        })
        return res.status(200).json({
            status: 'success',
            message: 'Successfully deleted.',
        });
    } catch (error) {
        console.log('Get Merchant Error', error);
        next(new httpError(error.message, 500));
    }
};
const changeMerchantStatus = async (req, res, next) => {
    const { merchantId } = req.params;
    try {
        const io = getIO();

        const merchant = await prisma.merchant.findUnique({
            where: { id: merchantId },
        });

        if (!merchant) return next(new httpError("Merchant not found", 404));

        // Update merchant status
        const updatedMerchant = await prisma.merchant.update({
            where: { id: merchantId },
            data: { status: req.body.status },
        });
        // Notify specific merchant's room
        io.to(`merchant-${merchantId}`).emit('merchant-status-changed', {
            status: updatedMerchant.status,
            message: `Your account status has been updated to: ${updatedMerchant.status}`,
            merchantId: merchant.id,
            businessName: merchant.businessName,
            timestamp: new Date()
        });
        return res.status(200).json({
            status: 'success',
            message: 'Merchant status updated successfully',
            data: updatedMerchant
        });

    } catch (error) {
        console.error('Update merchant status error:', error);
        next(new httpError(error.message, 500));
    }
};
const getMerchantByAccountId = async (req, res, next) => {
    const { accountId } = req.params;
    try {
        const merchant = await prisma.merchant.findFirst({
            where: { accountId },
            include: {
                account: true,
            },
        });
        console.log(merchant, 'and id account', accountId)
        // ✅ Always return 200 and let frontend decide
        return res.status(200).json({
            status: 'success',
            merchant: merchant || null,
        });

    } catch (error) {
        console.error("Get Merchant by Account Error:", error);
        return next(new httpError("Internal Server Error", 500));
    }
};

module.exports = {
    registerMerchant,
    getAllMerchant,
    getMerchantById,
    deleteMerchantById,
    changeMerchantStatus,
    testIo,
    getMerchantByAccountId
}