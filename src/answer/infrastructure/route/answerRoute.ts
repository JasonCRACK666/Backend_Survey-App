import { Router } from 'express'

import { PostgreSQLAnswerRepository } from '../repository/PostgreSQLAnswerRepository'
import { PostgreSQLQuestionRepository } from '../../../question/infrastructure/repository/PostgreSQLQuestionRepository'
import { PostgreSQLSurveyRepository } from '../../../survey/infrastructure/repository/PostgreSQLSurveyRepository'

import { AnswerUseCase } from '../../application/AnswerUseCase'

import { AnswerController } from '../controllers/AnswerController'

import isAuthenticated from '../../../user/infrastructure/permissions/isAuthenticated'

const router = Router()

const postgreSQLAnswerRepository = new PostgreSQLAnswerRepository()
const postgreSQLQuestionRepository = new PostgreSQLQuestionRepository()
const postgreSQLSurveyRepository = new PostgreSQLSurveyRepository()
const answerUseCase = new AnswerUseCase(
  postgreSQLAnswerRepository,
  postgreSQLQuestionRepository,
  postgreSQLSurveyRepository
)
const answerController = new AnswerController(answerUseCase)

router.post('/:surveyId', isAuthenticated, answerController.postSurveyResponses)

export default router
