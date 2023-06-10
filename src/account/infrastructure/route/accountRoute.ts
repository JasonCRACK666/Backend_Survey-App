import { Router } from 'express'

import { accountController } from '../dependencies/container'

const router = Router()

router.get('/:accountId', accountController.getDetailUserAccount)
router.patch('/:accountId', accountController.updateAccount)

export default router
