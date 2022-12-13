import { Router } from 'express'

import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'
import { AuthUseCase } from '../../application/AuthUseCase'
import { AuthController } from '../controllers/AuthController'

const router = Router()

const postgreSQLUserRepository = new PostgreSQLUserRepository()
const authUseCase = new AuthUseCase(postgreSQLUserRepository)
const authController = new AuthController(authUseCase)

router.post('/signUp', authController.postRegisterUser)
router.post('/signIn', authController.postLoginUser)

export default router
