const router = require('express').Router()

const { verify } = require('../middlewares/verify.middleware')
const { createRoom } = require('../controllers/rooms.controller')

router.get('/create-room',verify, createRoom)

module.exports = router