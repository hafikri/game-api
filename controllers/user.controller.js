require('dotenv').config()

const { User, UserRole } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.viewLogin = async (req, res, next) => {
    return res.render('login')
}

// fungsi register
exports.register = async (req, res, next) => {
    try {
        const { fullName, email, password, roleName } = req.body
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
                role: {
                name: roleName
                }
        }, {
            include: [
                {
                    model: UserRole,
                    as: 'role'
                }
            ]
        })

        return res.status(200).json({
            message: 'success register user, please login',
            code: 200,
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        console.log(req.headers)
        const {authorization} = req.headers

        if (authorization) {
            const bearerToken = authorization.split(' ')[1]

            try {
                const isValidToken = jwt.verify(bearerToken, process.env.JWT_TOKEN, {})
            if(isValidToken && isValidToken.userId) {
                return res.status(200).json({
                    message: 'success login',
                    code: 200
                })
            }
            } catch (error) {
                
            }   
        }
        
        const { email, password } = req.body

        const isExist = await User.findOne({
            where: {
                email
            },
            include: [
                {
                    model: UserRole,
                    as: 'role'
                }
            ]
        })

        if(!isExist) {
            throw{
                message: 'user not found',
                code: 404,
                error: 'bad request'
            }
        }

        const isMatch = await bcrypt.compare(password, isExist.password)

        if(!isMatch) {
            throw {
                message: 'invalid password',
                code: 404,
                error: 'bad request'
            }
        }

        const token = jwt.sign({ userId: isExist.id, roleName: isExist.role.name }, process.env.JWT_TOKEN, {expiresIn: '7 days'})

        return res.status(200).json({
            message: 'success login',
            code: 200,
            data: {
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.whoiami = async (req, res, next) => {
    try {
        const {user} = req
        
        return res.status(200).json({
            code: 200,
            message: 'success verify user',
            data: {
                fullName: user.fullName,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
}
