import pool from '../../../db'

import {
  QuestionDetailEntity,
  QuestionEntity,
  QuestionTypeEntity,
} from '../../domain/QuestionEntity'
import { QuestionRepository } from '../../domain/QuestionRepository'

import {
  createQuestionQuery,
  createQuestionTypeQuery,
  deleteAllQuestionsQuery,
  deleteQuestionQuery,
  findQuestionByIdQuery,
  findQuestionsBySurveyIdQuery,
  findQuestionTypeByIdQuery,
} from './SQLQuery'

export class PostgreSQLQuestionRepository implements QuestionRepository {
  public findQuestionById = async (
    questionId: string
  ): Promise<QuestionDetailEntity | null> => {
    const { rows: question } = await pool.query(findQuestionByIdQuery, [
      questionId,
    ])
    return question[0]
  }

  public findQuestionsBySurveyId = async (
    surveyId: string
  ): Promise<QuestionDetailEntity[] | null> => {
    const { rows: questions } = await pool.query(findQuestionsBySurveyIdQuery, [
      surveyId,
    ])
    return questions
  }

  public findQuestionTypeById = async (
    questionTypeId: string
  ): Promise<QuestionTypeEntity | null> => {
    const { rows: questionType } = await pool.query(findQuestionTypeByIdQuery, [
      questionTypeId,
    ])
    return questionType[0]
  }

  public createQuestion = async (
    questionData: QuestionEntity
  ): Promise<QuestionDetailEntity | null> => {
    await pool.query(createQuestionQuery, [
      questionData.id,
      questionData.survey_id,
      questionData.question_type_id,
      questionData.question,
    ])
    const questionCreated = await this.findQuestionById(questionData.id)
    return questionCreated
  }

  createQuestionType = async (
    questionTypeData: QuestionTypeEntity
  ): Promise<QuestionTypeEntity | null> => {
    await pool.query(createQuestionTypeQuery, [
      questionTypeData.id,
      questionTypeData.name,
    ])
    const questionTypeCreated = await this.findQuestionTypeById(
      questionTypeData.id
    )
    return questionTypeCreated
  }

  public deleteQuestion = async (questionId: string): Promise<void> => {
    await pool.query(deleteQuestionQuery, [questionId])
  }

  public deleteAllQuestions = async (): Promise<void> => {
    await pool.query(deleteAllQuestionsQuery)
  }
}
