import { Router } from 'express'

import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'
import { UserUseCase } from '../../application/UserUseCase'
import { UserController } from '../controllers/UserController'

const router = Router()

const postgreSQLUserRepository = new PostgreSQLUserRepository()
const userUseCase = new UserUseCase(postgreSQLUserRepository)
const userController = new UserController(userUseCase)

router.get('/:userId', userController.getDetailUser)

export default router
