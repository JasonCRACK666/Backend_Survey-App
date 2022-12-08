import { Router } from 'express'

import { PostgreSQLSurveyRepository } from '../repository/PostgreSQLSurveyRepository'
import { PostgreSQLQuestionRepository } from '../../../question/infrastructure/repository/PostgreSQLQuestionRepository'
import { PostgreSQLOptionRepository } from '../../../questionOption/infrastructure/repository/PostgreSQLOptionRepository'

import { SurveyUseCase } from '../../application/SurveyUseCase'

import { SurveyController } from '../controllers/SurveyController'

const router = Router()

const postgreSQLSurveyRepository = new PostgreSQLSurveyRepository()
const postgreSQLQuestionRepository = new PostgreSQLQuestionRepository()
const postgreSQLOptionRepository = new PostgreSQLOptionRepository()

const surveyUseCase = new SurveyUseCase(
  postgreSQLSurveyRepository,
  postgreSQLQuestionRepository,
  postgreSQLOptionRepository
)

const surveyController = new SurveyController(surveyUseCase)

router.post('', surveyController.postCreateSurvey)

export default router
