const prisma = require("../config/db")
const httpError = require("../middlewares/httpError")

const registerPage = async (req, res, next) => {
    try {
        const newPage = await prisma.mypage.create({
            data: {
                name: req.body.name,
                html: req.body.html,
                css: req.body.css,
                js: req.body.js,
                templateId: req.body.templateId
            }
        })
        res.status(200).json({
            page: newPage,
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
const updatePage = async (req, res, next) => {
    const { pageId } = req.params
    const { name, data } = req.body;
    try {
        const page = await prisma.myPage.upsert({
            where: { id: parseInt(pageId) },
            update: { name, data },
            create: { id: parseInt(pageId), name, data },
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

module.exports = {
    registerPage,
    getAllPage,
    updatePage,
    getById
}