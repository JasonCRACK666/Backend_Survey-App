import pool from '../../../db'

import { QuestionOptionEntity } from '../../domain/QuestionOptionEntity'
import { QuestionOptionRepository } from '../../domain/QuestionOptionRepository'
import {
  createQuestionOptionQuery,
  findQuestionOptionByIdQuery,
  deleteAllQuestionOptionsQuery,
  deleteQuestionOptionQuery,
  findQuestionOptionsByQuestionIdQuery,
} from './SQLQuery'

export class PostgreSQLOptionRepository implements QuestionOptionRepository {
  public findQuestionOptionsByQuestionId = async (
    questionId: string
  ): Promise<Omit<QuestionOptionEntity, 'question_id'>[] | null> => {
    const { rows: options } = await pool.query(
      findQuestionOptionsByQuestionIdQuery,
      [questionId]
    )
    return options
  }

  public findQuestionOptionById = async (
    questionOptionId: string
  ): Promise<QuestionOptionEntity | null> => {
    const { rows: questionOption } = await pool.query(
      findQuestionOptionByIdQuery,
      [questionOptionId]
    )
    return questionOption[0]
  }

  public createQuestionOption = async (
    questionOptionData: QuestionOptionEntity
  ): Promise<QuestionOptionEntity | null> => {
    await pool.query(createQuestionOptionQuery, [
      questionOptionData.id,
      questionOptionData.question_id,
      questionOptionData.option,
    ])
    const questionOptionCreated = await this.findQuestionOptionById(
      questionOptionData.id
    )
    return questionOptionCreated
  }

  public deleteQuestionOption = async (
    questionOptionId: string
  ): Promise<void> => {
    await pool.query(deleteQuestionOptionQuery, [questionOptionId])
  }

  public deleteAllQuestionOptions = async (): Promise<void> => {
    await pool.query(deleteAllQuestionOptionsQuery)
  }
}
