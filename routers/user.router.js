const router = require('express').Router()

const { register } = require('../controllers/user.controller')
const { validate } = require('../middlewares/validation.middleware')
const { registSchema } = require('../schemas/register.schema')

router.post('/register', validate(registSchema), register)

module.exports = router