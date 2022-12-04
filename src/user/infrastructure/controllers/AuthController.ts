import { Request, Response } from 'express'
import { UserUseCase } from '../../application/UserUseCase'

export class AuthController {
  constructor(private userUseCase: UserUseCase) {}

  public postRegisterUser = async (req: Request, res: Response) => {
    try {
      const { status, user } = await this.userUseCase.registerUser(req.body)
      res.status(status).json({ status, user })
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
}
