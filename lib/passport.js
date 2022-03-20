// lib/passport.js
const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')


const { User_account } = require('../models')

/* Passport JWT Options */
const options = {
 jwtFromRequest: ExtractJwt.fromHeader('authorization'),
 secretOrKey: 'binarch7',
}
 // Implementasi passport-jwt
passport.use(new JwtStrategy(options, async (payload, done) => {
 User_account.findByPk(payload.id)
   .then(user => done(null, user))
   .catch(err => done(err, false))
}))

module.exports = passport