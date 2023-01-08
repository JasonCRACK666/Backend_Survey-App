import { QuestionWithAnswers } from '../../question/domain/QuestionEntity'

export interface SurveyEntity {
  id: string
  title: string
  description: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface SurveyUserEntity extends Omit<SurveyEntity, 'user_id'> {
  avatar: string
  username: string
}

export interface SurveyComplete {
  user_id: string
  survey_id: string
}

export interface SurveyWithQuestionsAnswer
  extends Omit<SurveyEntity, 'user_id'> {
  completeds: number
  questions: QuestionWithAnswers[]
}
