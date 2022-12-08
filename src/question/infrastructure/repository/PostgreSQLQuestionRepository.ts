import pool from '../../../db';

import { QuestionEntity, QuestionTypeEntity } from '../../domain/QuestionEntity';
import { QuestionRepository } from '../../domain/QuestionRepository';

import {
  createQuestionQuery,
  deleteAllQuestionsQuery,
  deleteQuestionQuery,
  findQuestionByIdQuery,
  findQuestionTypeByIdQuery
} from './SQLQuery';

export class PostgreSQLQuestionRepository implements QuestionRepository {
  public findQuestionById = async (questionId: string): Promise<QuestionEntity | null> => {
    const { rows: question } = await pool.query(findQuestionByIdQuery, [questionId])
    return question[0] 
  }

  public findQuestionTypeById = async (questionTypeId: string): Promise<QuestionTypeEntity | null> => {
    const { rows: questionType } = await pool.query(findQuestionTypeByIdQuery, [questionTypeId])
    return questionType[0]
  }

  public createQuestion = async (questionData: QuestionEntity): Promise<QuestionEntity | null> => {
    await pool.query(createQuestionQuery, [
      questionData.id,
      questionData.survey_id,
      questionData.question_type_id,
      questionData.question
    ])
    const questionCreated = await this.findQuestionById(questionData.id)
    return questionCreated
  }

  public deleteQuestion = async (questionId: string): Promise<void> => {
    await pool.query(deleteQuestionQuery, [questionId])
  }

  public deleteAllQuestions = async (): Promise<void> => {
    await pool.query(deleteAllQuestionsQuery)
  }
}
