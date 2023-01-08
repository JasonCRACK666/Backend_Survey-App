import { AnswerTextDetail } from '../../answer/domain/AnswerEntity'

import { QuestionOptionEntity } from '../../questionOption/domain/QuestionOptionEntity'

export interface QuestionEntity {
  id: string
  survey_id: string
  question_type_id: string
  question: string
}

export interface QuestionDetailEntity
  extends Omit<QuestionEntity, 'question_type_id' | 'survey_id'> {
  question_type: string
}

export interface QuestionTypeEntity {
  id: string
  name: string
}

export interface Option {
  value: string
}

export interface QuestionWithOptions
  extends Omit<QuestionEntity, 'id' | 'survey_id'> {
  options?: string[]
}

export interface QuestionWithOptionsRecived
  extends Omit<QuestionEntity, 'id' | 'survey_id'> {
  options?: Option[]
}

export interface QuestionDetailWithOptions extends QuestionDetailEntity {
  options?: Omit<QuestionOptionEntity, 'question_id'>[]
}

export interface QuestionWithAnswers {
  id: string
  question_type: string
  question: string
  responses?: AnswerTextDetail[]
  options?: OptionWithAnswers[]
}

export interface OptionWithAnswers {
  id: string
  option: string
  selections: number
}
