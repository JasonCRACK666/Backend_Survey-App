import { Response } from 'express'

import { RequestAuth } from '../../../user/infrastructure/utils/RequestAuth'

import { AnswerUseCase } from '../../application/AnswerUseCase'

export class AnswerController {
  constructor(private answerUseCase: AnswerUseCase) {}

  public postSurveyResponses = async (req: RequestAuth, res: Response) => {
    try {
      const { surveyId } = req.params
      const { answers } = req.body
      const { status, message } =
        await this.answerUseCase.createSurveyResponses(
          req.user?.id!,
          surveyId,
          answers
        )
      res.status(status).json({
        status,
        message,
      })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public getSurveyResponses = async (req: RequestAuth, res: Response) => {
    try {
      const { surveyId } = req.params
      const { status, survey } = await this.answerUseCase.getDataFromSurvey(
        req.user?.username!,
        surveyId
      )
      res.status(status).json({ status, survey })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
