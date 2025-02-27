const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerTemplate = async (req, res, next) => {
    const {
        templateName,
        templatePrice,
        description,
        status
    } = req.body
    if (!req.file) return res.status(400).json({ message: 'File is required', success: false })
    try {
        const newTemplate = await prisma.mytemplate.create({
            data: {
                templateName,
                templatePrice,
                description,
                status,
                PreviewImage: req.file.filename

            }
        })
        res.status(201).json({
            message: 'The Template is successfully created',
            status: 'success',
            template: newTemplate
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
const getAllTemplate = async (req, res, next) => {
    try {
        const templates = await prisma.mytemplate.findMany()
        res.status(201).json({
            status: 'success',
            templates
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
module.exports = {
    registerTemplate,
    getAllTemplate
}