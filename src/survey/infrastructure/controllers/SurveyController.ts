import { Response, Request } from 'express'
import { RequestAuth } from '../../../user/infrastructure/utils/RequestAuth'

import { SurveyUseCase } from '../../application/SurveyUseCase'

export class SurveyController {
  constructor(private surveyUseCase: SurveyUseCase) {}

  public getSurveys = async (req: Request, res: Response) => {
    try {
      const { status, surveys } = await this.surveyUseCase.getAllSurveys()
      res.status(status).json({ status, surveys })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public getSurvey = async (req: Request, res: Response) => {
    try {
      const { surveyId } = req.params
      const { status, survey, questions } =
        await this.surveyUseCase.getSurveyQuestionsAndOptions(surveyId)
      res.status(status).json({ status, survey, questions })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public getIsCompleteSurvey = async (req: RequestAuth, res: Response) => {
    try {
      const { surveyId } = req.params
      const { status, isCompleted } =
        await this.surveyUseCase.whetherUserHasAlreadyCompletedSurvey(
          req.user?.id!,
          surveyId
        )
      res.status(status).json({
        status,
        isCompleted,
      })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public postCreateSurvey = async (req: RequestAuth, res: Response) => {
    try {
      const { survey, questions } = req.body
      const { status, message } =
        await this.surveyUseCase.createSurveyQuestionsAndOptions(
          req.user?.id!,
          survey,
          questions
        )
      res.status(status).json({ status, message })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
