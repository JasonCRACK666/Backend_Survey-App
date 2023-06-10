import { Router } from 'express'

import { authController } from '../dependencies/auth'

import isAuthenticated from '../permissions/isAuthenticated'

const router = Router()

router.post('/signUp', authController.postRegisterUser)
router.post('/signIn', authController.postLoginUser)
router.post('/verify', authController.verifyToken)
router.get('/users/me', isAuthenticated, authController.getMyUser)

export default router
