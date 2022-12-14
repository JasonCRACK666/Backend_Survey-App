import { AnswerMultiEntity, AnswerTextEntity } from './AnswerEntity'

export interface AnswerRepository {
  findAnswerTextById: (answerTextId: string) => Promise<AnswerTextEntity | null>
  findAnswerMultiById: (
    answerMultiId: string
  ) => Promise<AnswerMultiEntity | null>
  createAnswerText: (
    answerTextData: AnswerTextEntity
  ) => Promise<AnswerTextEntity | null>
  createAnswerMulti: (
    answerMultiData: AnswerMultiEntity
  ) => Promise<AnswerMultiEntity | null>
}
