import { v4 as uuid } from 'uuid'

import { QuestionEntity } from './QuestionEntity'

export class QuestionValue implements QuestionEntity {
  id: string
  survey_id: string
  question_type_id: string
  question: string

  constructor({
    survey_id,
    question_type_id,
    question,
  }: {
    survey_id: string
    question_type_id: string
    question: string
  }) {
    this.id = uuid()
    this.survey_id = survey_id
    this.question_type_id = question_type_id
    this.question = question
  }
}
