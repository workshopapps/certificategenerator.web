const userModel = require('../models/userModel')

// @desc    downloads certifcate records from User.records array
// @route   POST( or redirect with 307) /api/download
// @access  Private
// @data = collectionID
exports.getUserData = async (req, res, next) => {
    try {
        userModel.findOne({
            // from authentication token
            _id : req.user.userId
        }, (err, data) => {
            try {
                if(err) {
                    return next(err)
                }
                res.send(data.records.filter(item => item.collectionID === req.body.collectionID))
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}