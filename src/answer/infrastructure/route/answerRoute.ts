import { Router } from 'express'

import { PostgreSQLAnswerRepository } from '../repository/PostgreSQLAnswerRepository'
import { PostgreSQLQuestionRepository } from '../../../question/infrastructure/repository/PostgreSQLQuestionRepository'
import { PostgreSQLOptionRepository } from '../../../questionOption/infrastructure/repository/PostgreSQLOptionRepository'
import { PostgreSQLSurveyRepository } from '../../../survey/infrastructure/repository/PostgreSQLSurveyRepository'

import { AnswerUseCase } from '../../application/AnswerUseCase'

import { AnswerController } from '../controllers/AnswerController'

import isAuthenticated from '../../../user/infrastructure/permissions/isAuthenticated'

const router = Router()

const postgreSQLAnswerRepository = new PostgreSQLAnswerRepository()
const postgreSQLQuestionRepository = new PostgreSQLQuestionRepository()
const postgreSQLSurveyRepository = new PostgreSQLSurveyRepository()
const postgreSQLQuestionOptionRepository = new PostgreSQLOptionRepository()

const answerUseCase = new AnswerUseCase(
  postgreSQLAnswerRepository,
  postgreSQLQuestionRepository,
  postgreSQLQuestionOptionRepository,
  postgreSQLSurveyRepository
)

const answerController = new AnswerController(answerUseCase)

router.post('/:surveyId', isAuthenticated, answerController.postSurveyResponses)
router.get('/:surveyId', isAuthenticated, answerController.getSurveyResponses) // TODO: Hacer prueba de la ruta

export default router
