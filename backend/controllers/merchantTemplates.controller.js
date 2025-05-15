const prisma = require('../config/db')
const changeTemplate = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id, 'id one')
        //check the presence of the template
        const template = await prisma.merchantTemplate.findUnique({
            where: {
                id: id
            }
        })
        if (!template) {
            return res.status(400).json({
                message: 'Sorry this Template is not available',
                status: 'error'
            })
        }
        // get the Number of templates in the merchantTemplate table
        const numberOfTemplates = await prisma.merchantTemplate.count()
        if (numberOfTemplates < 2) {
            return res.status(400).json({
                message: 'Sorry You have only one template please buy other template.',
                status: 'error'
            })
        }
        // get all templates except the one with the given id and the make them the isUsed = false
        await prisma.merchantTemplate.updateMany({
            where: {
                id: {
                    not: id
                },
                isInUse: true
            },
            data: {
                isInUse: false
            }
        })
        // update the current template
        await prisma.merchantTemplate.update({
            where: {
                id: id
            },
            data: {
                isInUse: true
            }
        })

        return res.status(200).json({
            message: "Your shop use this Template  updated successfully",
            status: 'success'
        });
    } catch (error) {
        console.error("Error updating template:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const getAllMerchantTemplates = async (req, res, next) => {
    try {
        const templates = await prisma.merchantTemplate.findMany()
        if (!templates || templates.length === 0) {
            return res.status(200).json({
                staus: 'success',
                templates: []
            })
        }
        res.status(200).json({
            templates,
            status: 'success'
        })
    } catch (error) {
        console.error("Error getting all templates:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}
const getMerchantTemplateByDomain = async (req, res, next) => {
    try {
        const { domain } = req.params;
        console.log(domain, 'domain one')
        //check the presence of the template
        const shop = await prisma.shop.findFirst({
            where: {
                domain: domain
            }
        })
        if (!shop) {
            return res.status(400).json({
                message: 'Sorry this shop is not available',
                status: 'error'
            })
        }
        const template = await prisma.merchantTemplate.findFirst({
            where: {
                merchantId: shop.merchantId,
                isInUse: true
            }
        })
        if (!template) {
            return res.status(400).json({
                message: 'Sorry this Template is not available',
                status: 'error'
            })
        }
        console.log(template)
        return res.status(200).json({
            template,
            status: 'success'
        });
    } catch (error) {
        console.error("Error getting template by domain:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    changeTemplate,
    getAllMerchantTemplates,
    getMerchantTemplateByDomain
}