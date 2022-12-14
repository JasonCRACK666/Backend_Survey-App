import { AnswerMultiEntity, AnswerTextEntity } from '../domain/AnswerEntity'
import { AnswerMultiValue } from '../domain/AnswerMultiValue'
import { AnswerRepository } from '../domain/AnswerRepository'
import { AnswerTextValue } from '../domain/AnswerTextValue'

import { QuestionDetailEntity } from '../../question/domain/QuestionEntity'
import { QuestionRepository } from '../../question/domain/QuestionRepository'
import { SurveyRepository } from '../../survey/domain/SurveyRepository'

export class AnswerUseCase {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly surveyRepository: SurveyRepository
  ) {}

  public createSurveyResponses = async (
    userId: string,
    surveyId: string,
    answers: { questionId: string; response: string }[]
  ): Promise<{
    status: number
    message: string
  }> => {
    const surveyIsCompleted = await this.surveyRepository.findCompleteSurvey(
      userId,
      surveyId
    )

    if (surveyIsCompleted)
      throw {
        status: 403,
        error: 'Usted ya ha respondido a esta encuesta',
      }

    for (let answer of answers) {
      let question: QuestionDetailEntity | null
      try {
        question = await this.questionRepository.findQuestionById(
          answer.questionId
        )
      } catch (error) {
        throw {
          status: 500,
          error: 'Hubo un error, no se puedo encontrar una pregunta',
        }
      }

      if (!question)
        throw {
          status: 404,
          error: 'Una pregunta no existe',
        }

      if (question.question_type === 'multi') {
        const answerOptionValue = new AnswerMultiValue({
          questionId: question.id,
          optionId: answer.response,
          userId,
        })

        let answerOptionCreated: AnswerMultiEntity | null
        try {
          answerOptionCreated = await this.answerRepository.createAnswerMulti(
            answerOptionValue
          )
        } catch (error) {
          throw {
            status: 500,
            error:
              'Hubo un error, la respuesta a una pregunta de selección no se pudo realizar',
          }
        }

        if (!answerOptionCreated)
          throw {
            status: 400,
            error: 'No se ha creado la respuesta a una pregunta de selección',
          }

        continue
      }

      const answerTextValue = new AnswerTextValue({
        questionId: question.id,
        response: answer.response,
        userId,
      })

      let answerTextCreated: AnswerTextEntity | null
      try {
        answerTextCreated = await this.answerRepository.createAnswerText(
          answerTextValue
        )
      } catch (error) {
        throw {
          status: 500,
          error: 'Hubo un error, no se ha creado la respuesta a una pregunta',
        }
      }

      if (!answerTextCreated)
        throw {
          status: 400,
          error: 'No se ha creado la respuesta de una pregunta',
        }
    }

    try {
      await this.surveyRepository.createCompleteSurvey(userId, surveyId)
    } catch (error) {
      throw {
        status: 500,
        error: 'Hubo un error, no se puedo completar la encuesta',
      }
    }

    return {
      status: 200,
      message: 'Gracias por completar la encuesta',
    }
  }
}
