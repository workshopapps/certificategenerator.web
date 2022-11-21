const userModel = require('../models/userModel')

// @desc    downloads certifcate records from User.records array
// @route   POST /api/download
// @access  Private
// @ data = collectionID
exports.getUserData = async (req, res, next) => {
    try {
        userModel.findOne({
            // from authentication token
            _id : req.user.id
        }, (err, data) => {
            try {
                res.send(data.records.filter(item => item.collectionID === req.body.collectionID))
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}