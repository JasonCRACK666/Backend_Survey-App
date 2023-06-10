import { PostgreSQLAccountRepository } from '../repository/PostgreSQLAccountRepository'

import { AccountUseCase } from '../../application/AccountUseCase'

import { AccountController } from '../controllers/AccountController'

export const postgreSQLAccountRepository = new PostgreSQLAccountRepository()

export const accountUserCase = new AccountUseCase(postgreSQLAccountRepository)

export const accountController = new AccountController(accountUserCase)
