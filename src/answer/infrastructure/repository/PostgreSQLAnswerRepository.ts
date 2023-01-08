import pool from '../../../db'

import {
  AnswerTextEntity,
  AnswerMultiEntity,
  AnswerTextDetail,
} from '../../domain/AnswerEntity'

import { AnswerRepository } from '../../domain/AnswerRepository'
import {
  countSelectedOptionByOptionIdQuery,
  createAnswerMultiQuery,
  createAnswerTextQuery,
  findAnswerMultiByIdQuery,
  findAnswersTextByQuestionIdQuery,
  findAnswerTextByIdQuery,
} from './SQLQuery'

export class PostgreSQLAnswerRepository implements AnswerRepository {
  public findAnswersTextByQuestionId = async (
    questionId: string
  ): Promise<AnswerTextDetail[]> => {
    const { rows: answersText } = await pool.query(
      findAnswersTextByQuestionIdQuery,
      [questionId]
    )
    return answersText
  }

  public countSelectedOptionByOptionId = async (
    optionId: string
  ): Promise<{ selecteds: number }> => {
    const { rows } = await pool.query(countSelectedOptionByOptionIdQuery, [
      optionId,
    ])

    return {
      selecteds: Number(rows[0].selecteds),
    }
  }

  public findAnswerTextById = async (
    answerTextId: string
  ): Promise<AnswerTextEntity | null> => {
    const { rows: answerText } = await pool.query(findAnswerTextByIdQuery, [
      answerTextId,
    ])
    return answerText[0]
  }

  public findAnswerMultiById = async (
    answerMultiId: string
  ): Promise<AnswerMultiEntity | null> => {
    const { rows: answerMulti } = await pool.query(findAnswerMultiByIdQuery, [
      answerMultiId,
    ])
    return answerMulti[0]
  }

  public createAnswerText = async (
    answerTextData: AnswerTextEntity
  ): Promise<AnswerTextEntity | null> => {
    await pool.query(createAnswerTextQuery, [
      answerTextData.id,
      answerTextData.question_id,
      answerTextData.user_id,
      answerTextData.response,
    ])
    const answerTextCreated = await this.findAnswerTextById(answerTextData.id)
    return answerTextCreated
  }

  public createAnswerMulti = async (
    answerMultiData: AnswerMultiEntity
  ): Promise<AnswerMultiEntity | null> => {
    await pool.query(createAnswerMultiQuery, [
      answerMultiData.id,
      answerMultiData.question_id,
      answerMultiData.user_id,
      answerMultiData.option_id,
    ])
    const answerMultiCreated = await this.findAnswerMultiById(
      answerMultiData.id
    )
    return answerMultiCreated
  }
}
