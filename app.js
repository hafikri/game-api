require('dotenv').config()

const {SESSION_SECRET} = process.env
const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('./utils/passport')

const user = require('./routers/user.router')
const dashboard = require('./routers/dashboard.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(user)
app.use(dashboard)

app.use((err, req, res, next) => {
    console.log(err)
    const {message, code = 500, error = 'internal server error'} = err

    return res.status(code).json({
        message,
        code,
        error
    })
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server load with port: ${port}`)
})