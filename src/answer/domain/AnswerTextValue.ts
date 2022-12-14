import { v4 as uuid } from 'uuid'

import { AnswerTextEntity } from './AnswerEntity'

export class AnswerTextValue implements AnswerTextEntity {
  id: string
  question_id: string
  user_id: string
  response: string

  constructor({
    questionId,
    userId,
    response,
  }: {
    questionId: string
    userId: string
    response: string
  }) {
    this.id = uuid()
    this.question_id = questionId
    this.user_id = userId
    this.response = response
  }
}
