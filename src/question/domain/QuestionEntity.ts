import { QuestionOptionEntity } from '../../questionOption/domain/QuestionOptionEntity'

export interface QuestionEntity {
  id: string
  survey_id: string
  question_type_id: string
  question: string
}

export interface QuestionTypeEntity {
  id: string
  name: string
}

export interface QuestionWithOptions extends Omit<QuestionEntity, 'id' | 'survey_id'> {
  options?: Omit<QuestionOptionEntity, 'id'>[]
}
