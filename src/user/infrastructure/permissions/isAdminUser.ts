import { Response, NextFunction } from 'express'
import { RequestAuth } from '../utils/RequestAuth'

const isAdminUser = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  if (!req.user)
    res.status(401).json({
      status: 401,
      error: 'Usted no esta logueado',
    })

  const isAdmin = req.user?.is_admin

  if (!isAdmin)
    res.status(401).json({
      status: 401,
      error: 'Usted no es un administrador',
    })

  next()
}

export default isAdminUser
