const {User} = require('../models')

exports.createRoom = async (req, res, next) => {
    try {
        const {user} = req

        return res.status(200).json({
            code: 200,
            message: 'success verify user id',
            data: {
                id: user.id
            }
        })
    } catch (error) {
        next(error)
    }
}