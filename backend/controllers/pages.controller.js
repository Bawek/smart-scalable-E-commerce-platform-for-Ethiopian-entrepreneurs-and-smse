const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerPage = async (req, res, next) => {
    console.log(req.body.id, 'present id')
    try {
        // await prisma.myPage.deleteMany()
        const newPage = await prisma.myPage.upsert({
            where: { id: req.body.id },
            update: {
                name: req.body.name,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                templateId: parseInt(req.body.templateId)
            },
            create: {
                name: req.body.name,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                templateId: parseInt(req.body.templateId),
                id: req.body.id
            }
        })
        res.status(200).json({
            pages: newPage,
            status: 'success',
            message: 'page successfully created.'
        })
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getAllPage = async (req, res, next) => {
    try {
        const pages = await prisma.myPage.findMany()
        res.status(200).json({
            pages,
            status: 'success',
            message: 'page successfully created.'
        })
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getPagesByTemplate = async (req, res, next) => {
    const { templateId } = req.params; // Get templateId from request params

    try {
        const pages = await prisma.myPage.findMany({
            where: { templateId: parseInt(templateId) }, // Filter by templateId
        });

        res.status(200).json({
            pages,
            status: 'success',
            message: 'Pages retrieved successfully.',
        });

    } catch (error) {
        console.error('Error fetching pages:', error);
        next(new httpError(error.message, 500));
    }
};

const updatePage = async (req, res, next) => {
    const { name, data } = req.body;
    try {
        const page = await prisma.myPage.upsert({
            where: { id: parseInt(req.body.id) },
            update: {
                name: req.body.name,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                templateId: req.body.templateId
            },
            create: {
                name: req.body.name,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                templateId: req.body.templateId
            }
        });
        res.status(200).json({
            ...page,
            status: 'success',
            message: 'page successfully updated.'
        })
    } catch (error) {
        console.log('page update Error', error)
        next(new httpError(error.message, 500))
    }

}
const getById = async (req, res, next) => {
    const { pageId } = req.params
    console.log('pages update', req.body)
    try {
        const page = await prisma.mypage.findFirst({
            where: {
                id: Number(pageId)
            },
        })
        res.status(200).json({
            ...page,
            status: 'success',
        })
    } catch (error) {
        console.log('page update Error', error)
        next(new httpError(error.message, 500))
    }

}
const deletePageById = async (req, res, next) => {
    const { pageId } = req.params
    console.log('pages update', req.body)
    try {
        await prisma.myPage.delete({
            where: {
                id: pageId
            },
        })
        res.status(200).json({
            status: 'success',
            message: 'The Page is Successfully deleted'
        })
    } catch (error) {
        console.log('page update Error', error)
        next(new httpError(error.message, 500))
    }

}

module.exports = {
    registerPage,
    getAllPage,
    updatePage,
    getPagesByTemplate,
    getById,
    deletePageById
}