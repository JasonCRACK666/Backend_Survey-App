import { SurveyEntity, SurveyUserEntity } from './SurveyEntity'

export interface SurveyRepository {
  findSurveyById: (surveyId: string) => Promise<SurveyUserEntity | null>
  createSurvey: (surveyData: SurveyEntity) => Promise<SurveyUserEntity | null>
  updateSurvey: (
    surveyId: string,
    surveyData: Partial<
      Omit<SurveyEntity, 'id' | 'user_id' | 'created_at' | 'updated_at'>
    >
  ) => Promise<SurveyUserEntity | null>
  deleteAllSurveys: () => Promise<void>
}
