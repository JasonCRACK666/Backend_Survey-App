import { Response, Request } from 'express'
import { UserUseCase } from '../../application/UserUseCase'

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public getDetailUser = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { status, user } = await this.userUseCase.getDetailUser(userId)
    res.status(status).json({ status, user })
  }
}
