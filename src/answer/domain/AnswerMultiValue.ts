import { v4 as uuid } from 'uuid'

import { AnswerMultiEntity } from './AnswerEntity'

export class AnswerMultiValue implements AnswerMultiEntity {
  id: string
  question_id: string
  user_id: string
  option_id: string

  constructor({
    questionId,
    userId,
    optionId,
  }: {
    questionId: string
    userId: string
    optionId: string
  }) {
    this.id = uuid()
    this.question_id = questionId
    this.user_id = userId
    this.option_id = optionId
  }
}
