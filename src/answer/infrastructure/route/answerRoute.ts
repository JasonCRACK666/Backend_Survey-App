import { Router } from 'express'

import { answerController } from '../dependencies/container'

import isAuthenticated from '../../../user/infrastructure/permissions/isAuthenticated'

const router = Router()

router.post('/:surveyId', isAuthenticated, answerController.postSurveyResponses)
router.get('/:surveyId', isAuthenticated, answerController.getSurveyResponses) // TODO: Hacer prueba de la ruta

export default router
