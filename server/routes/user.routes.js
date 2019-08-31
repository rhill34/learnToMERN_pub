/**
 * User Routes 
 */
import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()
/**GET List all users and POST create a new user  */
router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

/**GET a single users, PUT update a user, DELETE delete a user */
router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

/**Bind the param */
router.param('userId', userCtrl.userByID)

export default router