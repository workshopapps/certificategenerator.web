const express = require('express');
const multer = require('multer');
const { emailNotification } = require('../controllers/emailNotificationController');
const Router = express.Router();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'pdf') {
        cb(null, true)
    } else {
        cb(new Error('Please Upload a PDF FILE'), false)
    }
}
const upload = multer({dest: "uploads/", fileFilter: multerFilter })

module.exports = app => {
    Router.post('/', upload.single('file'), emailNotification);

    app.use('/api/sendEmailNotification', Router)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
        
    })
}