import { v4 as uuid } from 'uuid'

import { QuestionOptionEntity } from './QuestionOptionEntity'

export class QuestionOptionValue implements QuestionOptionEntity {
  id: string
  question_id: string
  option: string

  constructor({
    question_id,
    option,
  }: {
    question_id: string
    option: string
  }) {
    this.id = uuid()
    this.question_id = question_id
    this.option = option
  }
}
