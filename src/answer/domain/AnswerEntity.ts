export interface AnswerTextEntity {
  id: string
  question_id: string
  user_id: string
  response: string
}

export interface AnswerMultiEntity {
  id: string
  question_id: string
  user_id: string
  option_id: string
}
