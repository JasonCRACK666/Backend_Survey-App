import { Router } from 'express'

import { PostgreSQLQuestionRepository } from '../repository/PostgreSQLQuestionRepository'
import { QuestionTypeUseCase } from '../../application/QuestionTypeUseCase'
import { QuestionTypeController } from '../controllers/QuestionTypeController'

import isAuthenticated from '../../../user/infrastructure/permissions/isAuthenticated'
import isAdminUser from '../../../user/infrastructure/permissions/isAdminUser'

const router = Router()

const postgreSQLQuestionRepository = new PostgreSQLQuestionRepository()
const questionTypeUseCase = new QuestionTypeUseCase(
  postgreSQLQuestionRepository
)
const questionTypeController = new QuestionTypeController(questionTypeUseCase)

router.post(
  '',
  [isAuthenticated, isAdminUser],
  questionTypeController.postCreateQuestionType
)

export default router
