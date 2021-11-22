const router = require('express').Router()

const {viewDashboard} = require('../controllers/dashboard.controller')

router.get('/dashboard', viewDashboard)

module.exports = router