const express = require('express');
const { sendCertificate } = require('../controllers/sendCertificateController')
const multer = require('multer')

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'pdf') {
        cb(null, true)
    } else {
        cb(new Error('Please Upload a PDF FILE'), false)
    }
}
const upload = multer({
    dest: "uploads/",
    fileFilter: multerFilter
})

const sendCertificateRoute = express.Router();

module.exports = app => {
    sendCertificateRoute.post('/', upload.single('file'), sendCertificate);

    app.use('/api/sendCertificate', sendCertificateRoute)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}