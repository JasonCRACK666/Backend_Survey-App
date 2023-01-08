import { AnswerMultiValue } from '../domain/AnswerMultiValue'
import { AnswerRepository } from '../domain/AnswerRepository'
import { AnswerTextValue } from '../domain/AnswerTextValue'
import {
  AnswerMultiEntity,
  AnswerTextDetail,
  AnswerTextEntity,
} from '../domain/AnswerEntity'

import { QuestionRepository } from '../../question/domain/QuestionRepository'
import {
  QuestionDetailEntity,
  QuestionWithAnswers,
  OptionWithAnswers,
} from '../../question/domain/QuestionEntity'

import { QuestionOptionRepository } from '../../questionOption/domain/QuestionOptionRepository'

import { SurveyRepository } from '../../survey/domain/SurveyRepository'
import {
  SurveyComplete,
  SurveyUserEntity,
  SurveyWithQuestionsAnswer,
} from '../../survey/domain/SurveyEntity'
import { QuestionOptionEntity } from '../../questionOption/domain/QuestionOptionEntity'

export class AnswerUseCase {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly questionOptionRepository: QuestionOptionRepository,
    private readonly surveyRepository: SurveyRepository
  ) {}

  public getDataFromSurvey = async (
    username: string,
    surveyId: string
  ): Promise<{
    status: number
    survey: SurveyWithQuestionsAnswer
  }> => {
    let survey: SurveyUserEntity | null
    try {
      survey = await this.surveyRepository.findSurveyById(surveyId)
    } catch (error) {
      throw {
        status: 500,
        error: 'Hubo un error, no se puedo buscar la encuesta',
      }
    }

    if (!survey)
      throw {
        status: 404,
        error: 'La encuesta no existe',
      }

    if (survey.username !== username)
      throw {
        status: 401,
        error: 'Esta encuesta no es de su pertenencia',
      }

    let countCompletedsSurvey: number
    try {
      const { completeds } = await this.surveyRepository.countCompletesSurvey(
        survey.id
      )
      countCompletedsSurvey = completeds
    } catch (error) {
      throw {
        status: 500,
        error:
          'Hubo un error, no se pudo obtener la cantidad de encuestas completadas',
      }
    }

    const { id, title, description, created_at, updated_at } = survey

    const surveyData: SurveyWithQuestionsAnswer = {
      id,
      title,
      description,
      created_at,
      updated_at,
      completeds: countCompletedsSurvey,
      questions: [],
    }

    let surveyQuestions: QuestionDetailEntity[] | null
    try {
      surveyQuestions = await this.questionRepository.findQuestionsBySurveyId(
        surveyId
      )
    } catch (error) {
      throw {
        status: 500,
        error:
          'Hubo un error, no se puedo hacer la busqueda de las preguntas de la encuesta',
      }
    }

    for (const question of surveyQuestions!) {
      const sendQuestion: QuestionWithAnswers = {
        id: question.id,
        question_type: question.question_type,
        question: question.question,
      }

      if (question.question_type === 'text') {
        let questionAnswers: AnswerTextDetail[]
        try {
          questionAnswers =
            await this.answerRepository.findAnswersTextByQuestionId(question.id)
        } catch (erros) {
          throw {
            status: 500,
            error:
              'Hubo un error, no se pudo hacer la busqueda de las respuestas a una pregunta',
          }
        }

        sendQuestion.responses = questionAnswers
        surveyData.questions.push(sendQuestion)

        continue
      }

      let optionsQuestionMulti:
        | Omit<QuestionOptionEntity, 'question_id'>[]
        | null
      try {
        optionsQuestionMulti =
          await this.questionOptionRepository.findQuestionOptionsByQuestionId(
            question.id
          )
      } catch (error) {
        throw {
          status: 500,
          error:
            'Hubo un error, no se puedo obtener las opciones de una pregunta',
        }
      }

      const sendOptions: OptionWithAnswers[] = []

      for (const option of optionsQuestionMulti!) {
        const sendOption: OptionWithAnswers = {
          id: option.id,
          option: option.option,
          selections: 0,
        }

        let optionSelections: { selecteds: number }
        try {
          optionSelections =
            await this.answerRepository.countSelectedOptionByOptionId(option.id)
        } catch (error) {
          throw {
            status: 500,
            error:
              'Hubo un error, no se pudo obtener la cantidad de opciones seleccionadas',
          }
        }

        sendOption.selections = optionSelections.selecteds
        sendOptions.push(sendOption)
      }

      sendQuestion.options = sendOptions
      surveyData.questions.push(sendQuestion)
    }

    return {
      status: 200,
      survey: surveyData,
    }
  }

  public createSurveyResponses = async (
    userId: string,
    surveyId: string,
    answers: Array<{ questionId: string; response: string }>
  ): Promise<{
    status: number
    message: string
  }> => {
    let surveyIsCompleted: SurveyComplete | null
    try {
      surveyIsCompleted = await this.surveyRepository.findCompleteSurvey(
        userId,
        surveyId
      )
    } catch (error) {
      throw {
        status: 500,
        error:
          'Hubo un error, no se puedo hacer la busqueda si la encuesta ha sido completada',
      }
    }

    if (surveyIsCompleted)
      throw {
        status: 403,
        error: 'Usted ya ha respondido a esta encuesta',
      }

    for (const answer of answers) {
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
