import { Router } from 'express'

import { userController } from '../dependencies/user'

const router = Router()

router.get('/:userId', userController.getDetailUser)

export default router
