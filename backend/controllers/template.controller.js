const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")
const fs = require('fs');
const path = require('path');
const registerTemplate = async (req, res, next) => {
    const {
        name,
        price,
        description,
        status
    } = req.body
    if (!req.file) return res.status(400).json({ message: 'File is required', success: false })

    try {
        const template = await prisma.template.findFirst({
            where: {
                name: name
            }
        })
        if (!template) return res.status(409).json({ message: 'The is Registered please change the name', success: false })

        const newTemplate = await prisma.template.create({
            data: {
                name,
                price: parseFloat(price),
                description,
                previewImage: [req.file.filename]
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
        const templates = await prisma.template.findMany()
        res.status(201).json({
            status: 'success',
            templates
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
const getTemplateById = async (req, res, next) => {
    const { templateId } = req.params
    try {
        const template = await prisma.template.findUnique({
            where: {
                id: templateId
            }
        })
        const pages = await prisma.page.findMany({
            where: {
                templateId: templateId
            } 
        })
        res.status(201).json({
            status: 'success',
            template: {
                ...template,
                pages
            }
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
const updateTempalate = async (req, res, next) => {
    const { templateId } = req.params;
    try {
        //  Check if the file is required, if provided, handle the file logic
        if (req.file) {
            const currentTemplate = await prisma.template.findUnique({
                where: { id: templateId },
                select: { previewImage: true }
            });

            if (currentTemplate && currentTemplate.previewImage.length > 0) {
                // If a file already exists, delete it from the server (assuming the file is stored locally)
                const oldFileName = currentTemplate.previewImage[0]; // Assuming previewImage is an array of file paths
                const oldFilePath = path.join(__dirname, '..', 'uploads', "images", oldFileName); // Adjust the path as necessary
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            // Save the new file path from the uploaded file
            previewImage = [req.file.filename];
        }

        //Prepare the data to update
        const updateData = {
            ...req.body,
            ...(req.body.price && { price: parseFloat(req.body.price) }),
            ...(previewImage && { previewImage })
        };

        //  Update the template with the provided templateId
        const template = await prisma.template.update({
            where: {
                id: templateId
            },
            data: updateData
        });

        //  Handle the case where no template is found
        if (!template) {
            return next(new httpError('There is no template with this Id', 404));
        }

        //  Respond with a success message after the update
        res.status(200).json({
            status: 'success',
            template,
            message: 'The template was successfully updated!'
        });
    } catch (error) {
        console.log('Template update error:', error);

        //  Handle errors gracefully
        next(new httpError(error.message || 'Failed to update the template.', 500));
    }
};
module.exports = {
    registerTemplate,
    getAllTemplate,
    getTemplateById,
    updateTempalate
}