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

export interface AnswerTextDetail {
  id: string
  response: string
  avatar: string
  username: string
}

export interface AnswerMultiDetail {
  id: string
  option: string
  selections: number
}
