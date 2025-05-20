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
        accountId,
        locationId,
        businessName,
        ownerName,
        businessPhone,
        businessEmail,
        cbeAccountNo,
        businessType,
    } = req.body;

    const normalizedBusinessName = businessName?.trim();
    const normalizedPhone = businessPhone?.trim();
    const normalizedEmail = businessEmail?.trim().toLowerCase();
    const normalizedCBE = cbeAccountNo?.trim();

    if (!mode || !['register', 'update'].includes(mode)) {
        return next(new httpError("Invalid or missing mode. Must be 'register' or 'update'.", 400));
    }
    if (mode === "register" && !req.file) {
        return next(new httpError("Identity card is required for registration.", 400));
    }

    try {
        const io = getIO();

        if (mode === 'register') {
            // Check for duplicate merchant
            const duplicateMerchant = await prisma.merchant.findFirst({
                where: {
                    OR: [
                        { businessName: normalizedBusinessName },
                        { businessPhone: normalizedPhone },
                        { businessEmail: normalizedEmail },
                        { cbeAccountNo: normalizedCBE }
                    ]
                }
            });

            if (duplicateMerchant) {
                return next(new httpError('A merchant already exists with one of the provided details.', 409));
            }

            const newMerchant = await prisma.merchant.create({
                data: {
                    accountId,
                    identityCard: req.file.filename,
                    locationId,
                    businessName: normalizedBusinessName,
                    ownerName,
                    businessPhone: normalizedPhone,
                    businessEmail: normalizedEmail,
                    cbeAccountNo: normalizedCBE,
                    businessType
                }
            });

            const fullMerchant = await prisma.merchant.findUnique({
                where: { id: newMerchant.id },
                include: { account: true }
            });

            // Emit new merchant to admin room
            io.to('admin-room').emit('new-merchant', {
                message: 'New merchant registration pending approval',
                merchantId: fullMerchant.id,
                businessName: fullMerchant.businessName,
                timestamp: new Date()
            });

            return res.status(201).json({
                message: 'Merchant registered successfully',
                status: "success",
                merchant: fullMerchant
            });

        } else if (mode === 'update') {
            const existingMerchant = await prisma.merchant.findFirst({
                where: { accountId }
            });

            if (!existingMerchant) {
                return next(new httpError("Merchant not found for the provided account.", 404));
            }

            const updateData = {
                locationId,
                businessName: normalizedBusinessName,
                ownerName,
                businessPhone: normalizedPhone,
                businessEmail: normalizedEmail,
                cbeAccountNo: normalizedCBE,
                businessType
            };

            if (req.file) {
                updateData.identityCard = req.file.filename;
            }

            const updatedMerchant = await prisma.merchant.update({
                where: { id: existingMerchant.id },
                data: updateData
            });

            const fullMerchant = await prisma.merchant.findUnique({
                where: { id: updatedMerchant.id },
                include: { account: true }
            });

            io.to('admin-room').emit('new-merchant', {
                message: 'Merchant account has been updated and is pending re-approval',
                merchantId: fullMerchant.id,
                businessName: fullMerchant.businessName,
                timestamp: new Date()
            });

            return res.status(200).json({
                message: 'Merchant updated successfully',
                status: "success",
                merchant: fullMerchant
            });
        }

    } catch (error) {
        console.error('Register/Update Merchant Error:', error);
        return next(new httpError("Server Error: " + error.message, 500));
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
const allowedStatuses = ['ACTIVE', 'SUSPENDED', 'PENDING']; 

const changeMerchantStatus = async (req, res, next) => {
    const { merchantId } = req.params;
    const { status } = req.body;

    try {
        const io = getIO();

        // Validate status
        if (!status || !allowedStatuses.includes(status)) {
            return next(new httpError("Invalid status value", 400));
        }

        // Check if merchant exists
        const merchant = await prisma.merchant.findUnique({
            where: { id: merchantId },
        });

        if (!merchant) {
            return next(new httpError("Merchant not found", 404));
        }

        // Prevent updating if status is already the same
        if (merchant.status === status) {
            return res.status(200).json({
                status: "no-change",
                message: `Merchant already has status: ${status}`,
            });
        }

        // Update status
        const updatedMerchant = await prisma.merchant.update({
            where: { id: merchantId },
            data: { status },
        });

        // Emit to specific merchant room
        io.to(`merchant-${merchantId}`).emit('merchant-status-changed', {
            status: updatedMerchant.status,
            message: `Your account status has been updated to: ${updatedMerchant.status}`,
            merchantId: updatedMerchant.id,
            businessName: updatedMerchant.businessName,
            timestamp: new Date(),
        });

        return res.status(200).json({
            status: "success",
            message: "Merchant status updated successfully",
            data: updatedMerchant,
        });

    } catch (error) {
        console.error("Change merchant status error:", error);
        next(new httpError("Failed to update merchant status", 500));
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