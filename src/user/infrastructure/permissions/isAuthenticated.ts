import { Response, NextFunction } from 'express'
import { RequestAuth } from '../utils/RequestAuth'

import jwt from 'jsonwebtoken'
import config from '../../../config'

import { UserEntity } from '../../domain/UserEntity'
import { PostgreSQLUserRepository } from '../repository/PostgreSQLUserRepository'

const postgreSQLUserRepository = new PostgreSQLUserRepository()

const isAuthenticated = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization
  if (!authorization && authorization?.split(' ')[0] !== 'Bearer') {
    res.status(401).json({
      status: 401,
      error: 'La autorización no se encuentra o es invalida',
    })
  }

  let user!: Pick<UserEntity, 'id' | 'username' | 'is_admin'>
  try {
    const token: string = authorization?.split(' ')[1]!
    user = jwt.verify(token, config.SECRET!) as Pick<
      UserEntity,
      'id' | 'username' | 'is_admin'
    >
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'El token enviado es invalido',
    })
  }

  let userExist!: UserEntity | null
  try {
    userExist = await postgreSQLUserRepository.findUserById(user.id)
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Hubo un error, no se puedo realizar la búsqueda de usuario',
    })
  }

  if (!userExist)
    res.status(401).json({
      status: 401,
      error: 'El usuario no existe',
    })

  req.user = {
    id: user.id,
    username: user.username,
    is_admin: user.is_admin,
  }

  next()
}

export default isAuthenticated
