import { SurveyEntity } from './SurveyEntity'

import { v4 as uuid } from 'uuid'

export class SurveyValue implements SurveyEntity {
  id: string
  title: string
  description: string
  user_id: string
  created_at: string
  updated_at: string

  constructor({
    title,
    description,
    user_id,
  }: {
    title: string
    description: string
    user_id: string
  }) {
    this.id = uuid()
    this.title = title
    this.description = description
    this.user_id = user_id
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }
}
