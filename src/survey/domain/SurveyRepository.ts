import { SurveyComplete, SurveyEntity, SurveyUserEntity } from './SurveyEntity'

export interface SurveyRepository {
  findSurveyById: (surveyId: string) => Promise<SurveyUserEntity | null>
  findAllSurveys: (userId: string) => Promise<Omit<SurveyEntity, 'user_id'>[]>
  findCompleteSurvey: (
    userId: string,
    surveyId: string
  ) => Promise<SurveyComplete | null>
  countCompletesSurvey: (surveyId: string) => Promise<{ completeds: number }>
  createSurvey: (surveyData: SurveyEntity) => Promise<SurveyUserEntity | null>
  updateSurvey: (
    surveyId: string,
    surveyData: Partial<
      Omit<SurveyEntity, 'id' | 'user_id' | 'created_at' | 'updated_at'>
    >
  ) => Promise<SurveyUserEntity | null>
  deleteAllSurveys: () => Promise<void>
  deleteSurveyById: (surveyId: string) => Promise<void>
  createCompleteSurvey: (
    userId: string,
    surveyId: string
  ) => Promise<SurveyComplete | null>
}
