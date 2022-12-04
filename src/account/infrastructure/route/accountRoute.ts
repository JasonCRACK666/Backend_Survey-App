import { Router } from 'express'

import { PostgreSQLAccountRepository } from '../repository/PostgreSQLAccountRepository'
import { AccountUseCase } from '../../application/AccountUseCase'
import { AccountController } from '../controllers/AccountController'

const router = Router()

const postgreSQLAccountRepository = new PostgreSQLAccountRepository()
const accountUserCase = new AccountUseCase(postgreSQLAccountRepository)
const accountController = new AccountController(accountUserCase)

router.get('/:userId', accountController.getDetailUserAccount)
router.patch('/:userId', accountController.updateAccount)

export default router
