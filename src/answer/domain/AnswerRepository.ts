import {
  AnswerMultiEntity,
  AnswerTextDetail,
  AnswerTextEntity,
} from './AnswerEntity'

export interface AnswerRepository {
  findAnswersTextByQuestionId: (
    questionId: string
  ) => Promise<AnswerTextDetail[]>
  countSelectedOptionByOptionId: (
    optionId: string
  ) => Promise<{ selecteds: number }>
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
