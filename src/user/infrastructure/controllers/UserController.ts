import { Response, Request } from 'express'
import { UserUseCase } from '../../application/UserUseCase'

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public getDetailUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const { status, user } = await this.userUseCase.getDetailUser(userId)
      res.status(status).json({ status, user })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
