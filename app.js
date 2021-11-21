require('dotenv').config()

const express = require('express')
const path = require('path')

const app = express()

app.use(express.json)
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

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