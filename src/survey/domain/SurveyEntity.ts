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
