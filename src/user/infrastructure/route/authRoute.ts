import { Router } from 'express'

import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'
import { AuthUseCase } from '../../application/AuthUseCase'
import { AuthController } from '../controllers/AuthController'
import { PostgreSQLAccountRepository } from '../../../account/infrastructure/repository/PostgreSQLAccountRepository'

const router = Router()

const postgreSQLUserRepository = new PostgreSQLUserRepository()
const postgreSQLAccountRepository = new PostgreSQLAccountRepository()
const authUseCase = new AuthUseCase(
  postgreSQLUserRepository,
  postgreSQLAccountRepository
)
const authController = new AuthController(authUseCase)

router.post('/signUp', authController.postRegisterUser)
router.post('/signIn', authController.postLoginUser)

export default router
