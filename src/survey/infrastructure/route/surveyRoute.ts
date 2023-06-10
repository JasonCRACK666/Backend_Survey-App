import { Router } from 'express'

import { surveyController } from '../dependencies/container'

import isAuthenticated from '../../../user/infrastructure/permissions/isAuthenticated'

const router = Router()

router.get('', isAuthenticated, surveyController.getSurveys)
router.get('/:surveyId', surveyController.getSurvey)
router.get(
  '/:surveyId/isComplete',
  isAuthenticated,
  surveyController.getIsCompleteSurvey
)

router.post('', isAuthenticated, surveyController.postCreateSurvey)

router.delete(
  '/:surveyId',
  isAuthenticated,
  surveyController.deleteOneSurveyById
)

export default router
