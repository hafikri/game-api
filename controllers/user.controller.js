require('dotenv').config()

const {User} = require("../models/user.model")

const bcrypt = require('bcrypt')

exports.register = async (req, res, next) => {
    try {
        const {fullName, email, password} = req.body
        const isExist = await User.findOne({
            where: {
                email
            },
            attributes: ['id']
        })

        if(isExist){
            throw{
                message: 'user already registered',
                code: 400,
                error: 'bad request'
            }
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await User.create({
            fullName,
            email,
            password: passwordHash,
        })

        return res.status(200).json({
            message: 'success register user, please login',
            code: 200
        })
    } catch (error) {
        next(error)
    }
}