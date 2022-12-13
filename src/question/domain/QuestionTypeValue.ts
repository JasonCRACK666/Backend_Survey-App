import { v4 as uuid } from 'uuid'

import { QuestionTypeEntity } from './QuestionEntity'

export class QuestionTypeValue implements QuestionTypeEntity {
  id: string
  name: string

  constructor(name: string) {
    this.id = uuid()
    this.name = name
  }
}
