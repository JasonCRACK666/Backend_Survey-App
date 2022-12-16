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

export interface QuestionWithOptions
  extends Omit<QuestionEntity, 'id' | 'survey_id'> {
  options?: string[]
}

export interface QuestionDetailWithOptions extends QuestionDetailEntity {
  options?: Omit<QuestionOptionEntity, 'question_id'>[]
}
