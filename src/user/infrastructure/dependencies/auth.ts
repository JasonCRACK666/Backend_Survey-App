import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'
import { postgreSQLAccountRepository } from '../../../account/infrastructure/dependencies/container'

import { AuthUseCase } from '../../application/AuthUseCase'

import { AuthController } from '../controllers/AuthController'

export const postgreSQLUserRepository = new PostgreSQLUserRepository()

export const authUseCase = new AuthUseCase(
  postgreSQLUserRepository,
  postgreSQLAccountRepository
)

export const authController = new AuthController(authUseCase)
