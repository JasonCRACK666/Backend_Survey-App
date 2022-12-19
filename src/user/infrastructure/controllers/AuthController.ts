import { Request, Response } from 'express'

import { AuthUseCase } from '../../application/AuthUseCase'
import { RequestAuth } from '../utils/RequestAuth'

export class AuthController {
  constructor(private userUseCase: AuthUseCase) { }

  public postRegisterUser = async (req: Request, res: Response) => {
    try {
      const { status, message } = await this.userUseCase.registerUser(req.body)
      res.status(status).json({ status, message })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public postLoginUser = async (req: Request, res: Response) => {
    try {
      const { status, token } = await this.userUseCase.loginUser(req.body)
      res.status(status).json({ status, token })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public verifyToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body
      const { status } = await this.userUseCase.verifyTokenIsValid(token)
      res.status(status).json({ status })
    } catch (error) {
      const err = error as { status: number, error: string }
      res.status(err.status).json(err)
    }
  }

  public getMyUser = async (req: RequestAuth, res: Response) => {
    try {
      const { status, user } = await this.userUseCase.getUserWithTheAccessToken(
        req.user?.id!
      )
      res.status(status).json({ status, user })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
