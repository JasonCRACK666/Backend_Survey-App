import { Router } from 'express'

import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'
import { UserUseCase } from '../../application/UserUseCase'
import { AuthController } from '../controllers/AuthController'

const router = Router()

const postgreSQLUserRepository = new PostgreSQLUserRepository()
const userUseCase = new UserUseCase(postgreSQLUserRepository)
const authController = new AuthController(userUseCase)

router.post('/signUp', authController.postRegisterUser)
router.post('/signIn', authController.postLoginUser)

export default router
