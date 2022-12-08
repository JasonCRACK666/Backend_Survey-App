import { SurveyEntity } from '../domain/SurveyEntity'
import { SurveyRepository } from '../domain/SurveyRepository'
import { SurveyValue } from '../domain/SurveyValue'

import { QuestionRepository } from '../../question/domain/QuestionRepository'
import { QuestionWithOptions } from '../../question/domain/QuestionEntity'
import { QuestionValue } from '../../question/domain/QuestionValue'

import { QuestionOptionRepository } from '../../questionOption/domain/QuestionOptionRepository'
import { QuestionOptionValue } from '../../questionOption/domain/QuestionOptionValue'

export class SurveyUseCase {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly questionOptionRepository: QuestionOptionRepository
  ) {}

  public createSurveyQuestionsAndOptions = async ({
    userId,
    survey,
    questions
  }: {
    userId: string,
    survey: { title: string, description: string },
    questions: QuestionWithOptions[]
  }): Promise<{ status: number, message: string }> => {
    if (questions.length < 1) throw {
      status: 403,
      error: 'Se require como mínimo tener una pregunta en la encuesta'
    }

    if (questions.length > 10) throw {
      status: 403,
      error: 'Solo se puede añadir como máximo 10 preguntas a una encuesta'
    }

    const surveyValue = new SurveyValue({ title: survey.title, description: survey.description, user_id: userId })
    
    const surveyCreated = await this.surveyRepository.createSurvey(surveyValue)
    
    if (!surveyCreated) throw {
      status: 500,
      error: 'No se ha podido crear la encuesta'
    }

    for (const question of questions) {
      const questionType = await this.questionRepository.findQuestionTypeById(question.question_type_id)
      if (!questionType) throw {
        status: 404,
        error: 'Hubo un error con el tipo de pregunta que se selecciono'
      }

      const questionValue = new QuestionValue({
        survey_id: surveyCreated.id,
        question_type_id: questionType.id,
        question: question.question
      })

      const questionCreated = await this.questionRepository.createQuestion(questionValue)
      if (!questionCreated) throw {
        status: 500,
        error: 'Hubo un error, se ha podido crear una pregunta de la encuesta'
      }

      if (questionType.name === 'multi' && question.options) {
        for (const option of question.options) {
          const optionValue = new QuestionOptionValue({ question_id: questionCreated.id, option: option.option })
          const questionOptionCreated = await this.questionOptionRepository.createQuestionOption(optionValue)
          if (!questionOptionCreated) throw {
            status: 500,
            error: 'Hubo un error al crear una opción para una pregunta multiple'
          }
        }
      }
    }

    return { status: 200, message: 'Se ha creado correctamente la encuesta' }
  }
}
