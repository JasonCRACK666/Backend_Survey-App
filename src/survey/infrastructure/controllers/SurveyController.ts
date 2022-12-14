import { Response } from 'express'
import { RequestAuth } from '../../../user/infrastructure/utils/RequestAuth'

import { SurveyUseCase } from '../../application/SurveyUseCase'

export class SurveyController {
  constructor(private surveyUseCase: SurveyUseCase) {}

  public postCreateSurvey = async (req: RequestAuth, res: Response) => {
    try {
      const { survey, questions } = req.body
      const { status, message } =
        await this.surveyUseCase.createSurveyQuestionsAndOptions({
          userId: req.user?.id!,
          survey,
          questions,
        })
      res.status(status).json({ status, message })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
