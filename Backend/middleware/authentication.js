// @desc an authentication middleware using jwt
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json('authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const {
            userId
        } = payload
        
        req.user = await User.findById(userId)
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({
            success: false,
            msg: 'Session Expired',
        })
    }

    if (!token) {
        res.status(401).json({
            success: false,
            msg: 'Token not authorized',
        })
    }
}

module.exports = auth