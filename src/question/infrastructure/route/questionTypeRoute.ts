import { Router } from 'express'

import { questionTypeController } from '../dependencies/container'

import isAuthenticated from '../../../user/infrastructure/permissions/isAuthenticated'
import isAdminUser from '../../../user/infrastructure/permissions/isAdminUser'

const router = Router()

router.post(
  '',
  [isAuthenticated, isAdminUser],
  questionTypeController.postCreateQuestionType
)
router.get('', questionTypeController.getQuestionTypes)

export default router
