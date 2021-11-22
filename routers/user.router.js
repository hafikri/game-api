const router = require('express').Router()

const passport = require('../utils/passport')
const { register, login } = require('../controllers/user.controller')
const { validate } = require('../middlewares/validation.middleware')
const { loginSchema } = require('../schemas/login.schema')
const { registSchema } = require('../schemas/register.schema')

router.post('/register', validate(registSchema), register)

router.post('/login', validate(loginSchema), login)
router.post('/login/web', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))


module.exports = router