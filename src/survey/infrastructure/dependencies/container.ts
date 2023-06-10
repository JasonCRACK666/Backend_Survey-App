import { PostgreSQLSurveyRepository } from '../repository/PostgreSQLSurveyRepository'
import { postgreSQLQuestionRepository } from '../../../question/infrastructure/dependencies/container'
import { postgreSQLOptionRepository } from '../../../questionOption/infrastructure/dependencies/container'

import { SurveyUseCase } from '../../application/SurveyUseCase'

import { SurveyController } from '../controllers/SurveyController'

export const postgreSQLSurveyRepository = new PostgreSQLSurveyRepository()

export const surveyUseCase = new SurveyUseCase(
  postgreSQLSurveyRepository,
  postgreSQLQuestionRepository,
  postgreSQLOptionRepository
)

export const surveyController = new SurveyController(surveyUseCase)
