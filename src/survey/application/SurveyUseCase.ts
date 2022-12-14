import { SurveyRepository } from '../domain/SurveyRepository'
import { SurveyValue } from '../domain/SurveyValue'

import { QuestionRepository } from '../../question/domain/QuestionRepository'
import {
  QuestionDetailEntity,
  QuestionWithOptions,
} from '../../question/domain/QuestionEntity'
import { QuestionValue } from '../../question/domain/QuestionValue'

import { QuestionOptionRepository } from '../../questionOption/domain/QuestionOptionRepository'
import { QuestionOptionValue } from '../../questionOption/domain/QuestionOptionValue'
import { SurveyUserEntity } from '../domain/SurveyEntity'

export class SurveyUseCase {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly questionOptionRepository: QuestionOptionRepository
  ) {}

  public createSurveyQuestionsAndOptions = async ({
    userId,
    survey,
    questions,
  }: {
    userId: string
    survey: { title: string; description: string }
    questions: QuestionWithOptions[]
  }): Promise<{ status: number; message: string }> => {
    if (questions.length < 1)
      throw {
        status: 403,
        error: 'Se require como mínimo tener una pregunta en la encuesta',
      }

    if (questions.length > 10)
      throw {
        status: 403,
        error: 'Solo se puede añadir como máximo 10 preguntas a una encuesta',
      }

    const surveyValue = new SurveyValue({
      title: survey.title,
      description: survey.description,
      user_id: userId,
    })

    let surveyCreated: SurveyUserEntity | null
    try {
      surveyCreated = await this.surveyRepository.createSurvey(surveyValue)
    } catch (error) {
      throw {
        status: 500,
        error: 'No se ha podido crear la encuesta',
      }
    }

    if (!surveyCreated)
      throw {
        status: 404,
        error: 'La encuesta no se ha podido crear',
      }

    for (const question of questions) {
      const questionType = await this.questionRepository.findQuestionTypeById(
        question.question_type_id
      )

      if (!questionType)
        throw {
          status: 404,
          error: 'Hubo un error con el tipo de pregunta que se selecciono',
        }

      const questionValue = new QuestionValue({
        survey_id: surveyCreated!.id,
        question_type_id: questionType.id,
        question: question.question,
      })

      let questionCreated: QuestionDetailEntity | null
      try {
        questionCreated = await this.questionRepository.createQuestion(
          questionValue
        )
      } catch (error) {
        throw {
          status: 500,
          error:
            'Hubo un error, se ha podido crear una pregunta de la encuesta',
        }
      }

      if (questionType.name === 'multi' && question.options) {
        for (const option of question.options) {
          const optionValue = new QuestionOptionValue({
            question_id: questionCreated!.id,
            option: option,
          })

          try {
            await this.questionOptionRepository.createQuestionOption(
              optionValue
            )
          } catch (error) {
            throw {
              status: 500,
              error:
                'Hubo un error al crear una opción para una pregunta multiple',
            }
          }
        }
      }
    }

    return { status: 200, message: 'Se ha creado correctamente la encuesta' }
  }
}
