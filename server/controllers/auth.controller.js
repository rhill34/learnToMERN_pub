/**
 * Auth Controller 
 * 
 * Functions will handle the following requests:
 *  sign-in routes,
 *  sign-out routes,
 *  JWT functionality to authorize user API endpoints,
 *  express-jwt functionality to authorize user API endpoints,
 *  JWT functionality to protect user API endpoints,
 *  express-jwt functionality to protect user API endpoints
 */

import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressjwt from 'express-jwt'
import config from './../../config/config'


const signin = (req,res)=>{
     //TODO
}
const signout = (req,res) => {
    //TODO
}
const requireSignin = ''//TODO
const hasAuthorization = (req,res) => {
     //TODO
}