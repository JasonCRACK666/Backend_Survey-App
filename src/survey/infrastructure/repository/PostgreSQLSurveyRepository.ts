import pool from '../../../db';

import { SurveyUserEntity, SurveyEntity } from '../../domain/SurveyEntity';
import { SurveyRepository } from '../../domain/SurveyRepository'

import { createSurveyQuery, deleteAllSurveysQuery, selectSurveyByIdQuery, updateSurveyQuery } from './SQLQuery';

export class PostgreSQLSurveyRepository implements SurveyRepository {
  public findSurveyById = async (surveyId: string): Promise<SurveyUserEntity | null> => {
    const { rows: survey } = await pool.query(selectSurveyByIdQuery, [surveyId])
    return survey[0]
  }

  public createSurvey = async (surveyData: SurveyEntity): Promise<SurveyUserEntity | null> => {
    await pool.query(createSurveyQuery, [
      surveyData.id,
      surveyData.title,
      surveyData.description,
      surveyData.user_id,
      surveyData.created_at,
      surveyData.updated_at
    ])
    const survey = await this.findSurveyById(surveyData.id)
    return survey
  }

  public updateSurvey = async (
    surveyId: string,
    surveyData: { title?: string, description?: string }
  ): Promise<SurveyUserEntity | null> => {
    await pool.query(updateSurveyQuery, [surveyId, surveyData.title, surveyData.description])
    const surveyUpdated = await this.findSurveyById(surveyId)
    return surveyUpdated
  }

  public deleteAllSurveys = async (): Promise<void> => {
    await pool.query(deleteAllSurveysQuery)
  }
}
