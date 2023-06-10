import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'

import { UserUseCase } from '../../application/UserUseCase'

import { UserController } from '../controllers/UserController'

export const postgreSQLUserRepository = new PostgreSQLUserRepository()

export const userUseCase = new UserUseCase(postgreSQLUserRepository)

export const userController = new UserController(userUseCase)
