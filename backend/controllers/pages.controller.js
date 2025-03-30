const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerPage = async (req, res, next) => {
    try {
        const page = await prisma.page.findFirst({
            where: {
                name: req.body.name,
                templateId: req.body.templateId
            }
        })
        if (page) return next(new httpError('Sorry The page is present', 409))
        const newPage = await prisma.page.create({
            data: {
                name: req.body.name,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                templateId: req.body.templateId,
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
        const pages = await prisma.page.findMany()
        if (!pages) return res.status(200).json({
            pages: [],
            status: 'success',
        })
        res.status(200).json({
            pages,
            status: 'success'
        })
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }

}
const getPagesByTemplate = async (req, res, next) => {
    const { templateId } = req.params; // Get templateId from request params

    try {
        const pages = await prisma.page.findMany({
            where: { templateId }, // Filter by templateId
        });
        if (!pages) return res.status(200).json({
            pages: [],
            status: 'success',
        })
        res.status(200).json({
            pages,
            status: 'success',
        });

    } catch (error) {
        console.error('Error fetching pages:', error);
        next(new httpError(error.message, 500));
    }
};

const updatePage = async (req, res, next) => {
    const { pageId } = req.params
    const { name, id } = req.body;
    try {
        const page = await prisma.page.upsert({
            where: { id: req.body.id },
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
        const page = await prisma.page.findFirst({
            where: {
                id: pageId
            }
        })
        if (!page) return next(new httpError('Sorry The page is present', 409))

        await prisma.page.delete({
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