/**
 * Authorize and Protected Routes 
 */
import { Router as expressRouter } from 'express';

const router = expressRouter();
//  import express from 'express'
import authCtrl from '../controllers/auth.controller'

// const router = express.Router
/**
 * POST to request authenticate the user email and password
 */
router.route('/auth/signin')
    .post(authCtrl.signin)
/**
 * GET to request to clear the client cookie containing the JWT that was set 
 * on the response object
 */
router.route('/auth/signout')
    .get(authCtrl.signout)

export default router