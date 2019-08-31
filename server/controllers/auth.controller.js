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
import { RSA_NO_PADDING } from 'constants';

/**
 * Sign-In
 * route declared in signin API endpoint @ './../routes/auth.routes'
 * @param {email password} req 
 * @param {token} res 
 */
const signin = (req,res)=>{
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
const signout = (req,res) => {
    //TODO
}
const requireSignin = ''//TODO
const hasAuthorization = (req,res) => {
     //TODO
}