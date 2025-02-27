
const uploadImage = async (req, res, next) => {
    if (!req.files) return res.status(400).json({ message: 'File is required', success: false })
        console.log(req.files.files[0].path)
    const imagepath = `http://localhost:5000/${req.files.files[0].filename}`
    const pdfPath = `http://localhost:5000/${req.files.files[0].filename}`
    try {
        res.status(200).json([
            req.files.files[0].path
       ])
    } catch (error) {
        console.log(error,'image uploade')
    }
}

module.exports = {
    uploadImage
}