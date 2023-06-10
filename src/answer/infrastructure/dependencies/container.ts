import { PostgreSQLAnswerRepository } from '../repository/PostgreSQLAnswerRepository'

import { postgreSQLQuestionRepository } from '../../../question/infrastructure/dependencies/container'
import { postgreSQLSurveyRepository } from '../../../survey/infrastructure/dependencies/container'
import { postgreSQLOptionRepository } from '../../../questionOption/infrastructure/dependencies/container'

import { AnswerUseCase } from '../../application/AnswerUseCase'

import { AnswerController } from '../controllers/AnswerController'

export const postgreSQLAnswerRepository = new PostgreSQLAnswerRepository()

export const answerUseCase = new AnswerUseCase(
  postgreSQLAnswerRepository,
  postgreSQLQuestionRepository,
  postgreSQLOptionRepository,
  postgreSQLSurveyRepository
)

export const answerController = new AnswerController(answerUseCase)
