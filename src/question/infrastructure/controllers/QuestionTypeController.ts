import { Response } from 'express'
import { RequestAuth } from '../../../user/infrastructure/utils/RequestAuth'

import { QuestionTypeUseCase } from '../../application/QuestionTypeUseCase'

export class QuestionTypeController {
  constructor(private questionTypeUseCase: QuestionTypeUseCase) {}

  public postCreateQuestionType = async (req: RequestAuth, res: Response) => {
    try {
      const { name } = req.body
      const { status, questionType } =
        await this.questionTypeUseCase.createQuestionType(name)
      res.status(status).json({ status, questionType })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
