/**
 * User Routes 
 */
import express from 'express'
import userCtrl from '../controllers/user.controller'

const router = express.Router()
/**GET List all users and POST create a new user  */
router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

/**GET a single users, PUT update a user, DELETE delete a user */
router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

/**Bind the param */
router.param('userId', userCtrl.userByID)

export default router