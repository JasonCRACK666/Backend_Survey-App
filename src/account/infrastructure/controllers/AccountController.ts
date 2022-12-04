import { Request, Response } from 'express'

import { AccountUseCase } from '../../application/AccountUseCase'

export class AccountController {
  constructor(private accountUseCase: AccountUseCase) {}

  public getDetailUserAccount = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const { status, account } = await this.accountUseCase.getDetailAccount(
        userId
      )
      res.status(status).json({ status, account })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public updateAccount = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const { status, account } =
        await this.accountUseCase.updateAccountAndNotify(userId, req.body)
      res.status(status).json({ status, account })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
