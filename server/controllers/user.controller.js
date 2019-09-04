/**
 * User Controller CRUD methods for route callbacks
 */
import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'

/**
 * Create a new user 
 **/
const create = (req, res, next) => {
    const user = new User(req.body)
    user.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Successully Seeker SeeMee created!"
        })
    })
}
/**
 * Listing all the users 
 * */
const list = (req, res) => {
    User.find((err,users) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(users)
    }).select('name email updated created')//These are the keys from the Mongoose UserSchema that are returned for all users in the MongoDB
}
/**
 * Loading param
 */
const userByID = (req, res, next, id) => {
    User.findById(id).exec((err,user) => {
        if (err || !user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next()//middleware to propagate the next relevant function. read is the next relevant function in the controller. Thus, if userByID controller is uses next(), then the next controller is read. 
    })
}
/*
Reading 
*/
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
/*
Updating 
*/
const update = (req, res, next) => {
    let user =req.profile
    user =_.extend(user, req.body)
    user.updated = Date.now()
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.join(user)
    })
}
/*
Deleting 
*/
const remove = (req, res, next) => {
    let user = req.profile
    user.deletOne((err, deletedUser) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.join(deletedUser)
    })
}

export default {create, list, userByID, read, update, remove}