import { Response, Request } from 'express'
import { QuestionWithOptionsRecived } from '../../../question/domain/QuestionEntity'
import { RequestAuth } from '../../../user/infrastructure/utils/RequestAuth'

import { SurveyUseCase } from '../../application/SurveyUseCase'

export class SurveyController {
  constructor(private surveyUseCase: SurveyUseCase) {}

  public getSurveys = async (req: RequestAuth, res: Response) => {
    try {
      const { status, surveys } = await this.surveyUseCase.getAllSurveys(
        req.user?.id!
      )
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
      const { title, description, questions } = req.body as {
        title: string
        description: string
        questions: QuestionWithOptionsRecived[]
      }

      if (title.length <= 6)
        throw {
          status: 403,
          error: 'El titulo debe de tener minimo 6 caracteres',
        }

      if (description.length <= 10)
        throw {
          status: 403,
          error: 'La description debe de tener minimo 10 caracteres',
        }

      if (questions.length < 1)
        throw {
          status: 403,
          error: 'Se require como mínimo tener una pregunta en la encuesta',
        }

      questions.forEach(question => {
        if (!question.options) return

        if (question.options.length <= 0)
          throw {
            status: 400,
            error: 'A una pregunta multiple le faltan sus opciones',
          }

        const optionContentAnything = question.options.some(
          option => option.value === ''
        )

        if (optionContentAnything)
          throw {
            status: 403,
            error: 'Una de las opciones de una pregunta multiple esta vacia',
          }
      })

      const { status, message, surveyId } =
        await this.surveyUseCase.createSurveyQuestionsAndOptions(
          req.user?.id!,
          title,
          description,
          questions
        )
      res.status(status).json({ status, message, surveyId })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }

  public deleteOneSurveyById = async (req: RequestAuth, res: Response) => {
    try {
      const { surveyId } = req.params
      const { status, message } = await this.surveyUseCase.deleteOneSurvey(
        surveyId,
        req.user!.username
      )
      res.status(status).json({ status, message })
    } catch (error) {
      const err = error as { status: number; error: string }
      res.status(err.status).json(err)
    }
  }
}
