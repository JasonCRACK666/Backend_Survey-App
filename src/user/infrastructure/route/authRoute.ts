import { Router } from 'express'

import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'
import { PostgreSQLAccountRepository } from '../../../account/infrastructure/repository/PostgreSQLAccountRepository'

import { AuthUseCase } from '../../application/AuthUseCase'

import { AuthController } from '../controllers/AuthController'

import isAuthenticated from '../permissions/isAuthenticated'

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
router.post('/verify', authController.verifyToken)
router.get('/users/me', isAuthenticated, authController.getMyUser)

export default router
