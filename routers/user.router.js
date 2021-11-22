const router = require('express').Router()

const passport = require('../utils/passport')
const { register, login, viewLogin } = require('../controllers/user.controller')
const { validate } = require('../middlewares/validation.middleware')
const { loginSchema } = require('../schemas/login.schema')
const { registSchema } = require('../schemas/register.schema')

router.post('/register', validate(registSchema), register)

router.post('/login/web', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/login',validate(loginSchema), login)
router.get('/login', viewLogin)


module.exports = router