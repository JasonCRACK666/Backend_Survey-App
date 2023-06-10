import { PostgreSQLQuestionRepository } from '../repository/PostgreSQLQuestionRepository'

import { QuestionTypeUseCase } from '../../application/QuestionTypeUseCase'

import { QuestionTypeController } from '../controllers/QuestionTypeController'

export const postgreSQLQuestionRepository = new PostgreSQLQuestionRepository()

export const questionTypeUseCase = new QuestionTypeUseCase(
  postgreSQLQuestionRepository
)

export const questionTypeController = new QuestionTypeController(
  questionTypeUseCase
)
