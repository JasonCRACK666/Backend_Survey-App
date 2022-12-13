import { Request, Response, NextFunction } from 'express'

const isAdminUser = async (req: Request, res: Response, next: NextFunction) => {
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
