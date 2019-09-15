/**
 * Auth Controller 
 * 
 * Functions will handle the following requests:
 *  sign-in routes,
 *  sign-out routes,
 *  JWT functionality to authorize user API endpoints, //
 *  express-jwt functionality to protect user API endpoints,
 *  
 */

import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressjwt from 'express-jwt'
import config from './../../config/config'

/**
 * Sign-In
 * route declared in signin API endpoint @ './../routes/auth.routes'
 * @param {email password} req 
 * @param {token} res 
 */
const signin = (req,res) => {
     User.findOne({
         "email":req.body.email
     }, (err, user) => {
         if(err || !user)
            return res.status('401').json({
                error: "User not found"
            })
        if(!user.authenticate(req.body.password)){
            return res.status('401').send({
                error: "Seeker Email and password dont match"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.jwtSecret)

        res.cookie("t", token, {
            expire: new Date() + 9999
        })

        return res.json({
            token,
            user: {_id: user._id, name: user.name, email: user.email}
        })
    })
}
/**
 * Signout 
 * route declared in signout API endpoint './../routes/authroutes'
 * @param {Sign} req 
 * @param {*} res 
 */
const signout = (req,res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "Seeker signed out"
    })
}
/**
 * Require Signin 
 * used to verify authorized express-jwt request have valid JWT
 */
const requireSignin = expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})
const hasAuthorization = (req,res, next) => {
     const authorized = req.profile && req.auth && req.profile._id == req.auth._id
     if (!(authorized)) {
         return res.status('403').json({
             error: "User is not authorized to look"
         })
     }
     next()
}

export default {signin, signout, requireSignin, hasAuthorization}