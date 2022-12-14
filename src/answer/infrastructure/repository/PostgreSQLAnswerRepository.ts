import pool from '../../../db'

import { AnswerTextEntity, AnswerMultiEntity } from '../../domain/AnswerEntity'

import { AnswerRepository } from '../../domain/AnswerRepository'
import {
  createAnswerMultiQuery,
  createAnswerTextQuery,
  findAnswerMultiByIdQuery,
  findAnswerTextByIdQuery,
} from './SQLQuery'

export class PostgreSQLAnswerRepository implements AnswerRepository {
  findAnswerTextById = async (
    answerTextId: string
  ): Promise<AnswerTextEntity | null> => {
    const { rows: answerText } = await pool.query(findAnswerTextByIdQuery, [
      answerTextId,
    ])
    return answerText[0]
  }

  findAnswerMultiById = async (
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
