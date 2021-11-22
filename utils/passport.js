const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {User} = require('../models')
const bcrypt = require('bcrypt')

const authenticate = async(email, password, done) => {
    try {
        const user = await User.findOne({
            where: {email}
        })
        if (!user) {
            throw new Error('user not found')
        }

        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            throw new Error('invalid password')
        }

        return done(null, user)
    } catch (error) {
        return done(null, false, {message: error.message})
    }
}

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, authenticate))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const  user = await User.findByPk(id)

    done(null, user.dataValues)
})

module.exports = passport