import pool from '../../../db'

import {
  SurveyUserEntity,
  SurveyEntity,
  SurveyComplete,
} from '../../domain/SurveyEntity'

import { SurveyRepository } from '../../domain/SurveyRepository'

import {
  createCompleteSurveyQuery,
  createSurveyQuery,
  deleteAllSurveysQuery,
  findAllSurveysQuery,
  findCompleteSurveyQuery,
  findSurveyByIdQuery,
  updateSurveyQuery,
} from './SQLQuery'

export class PostgreSQLSurveyRepository implements SurveyRepository {
  public findAllSurveys = async (
    userId: string
  ): Promise<SurveyUserEntity[]> => {
    const { rows: surveys } = await pool.query(findAllSurveysQuery, [userId])
    return surveys
  }

  public findSurveyById = async (
    surveyId: string
  ): Promise<SurveyUserEntity | null> => {
    const { rows: survey } = await pool.query(findSurveyByIdQuery, [surveyId])
    return survey[0]
  }

  public findCompleteSurvey = async (
    userId: string,
    surveyId: string
  ): Promise<SurveyComplete | null> => {
    const { rows: completeSurvey } = await pool.query(findCompleteSurveyQuery, [
      userId,
      surveyId,
    ])
    return completeSurvey[0]
  }

  public createSurvey = async (
    surveyData: SurveyEntity
  ): Promise<SurveyUserEntity | null> => {
    await pool.query(createSurveyQuery, [
      surveyData.id,
      surveyData.title,
      surveyData.description,
      surveyData.user_id,
      surveyData.created_at,
      surveyData.updated_at,
    ])
    const survey = await this.findSurveyById(surveyData.id)
    return survey
  }

  public createCompleteSurvey = async (
    userId: string,
    surveyId: string
  ): Promise<SurveyComplete | null> => {
    await pool.query(createCompleteSurveyQuery, [userId, surveyId])
    const completeSurveyCreated = await this.findCompleteSurvey(
      userId,
      surveyId
    )
    return completeSurveyCreated
  }

  public updateSurvey = async (
    surveyId: string,
    surveyData: { title?: string; description?: string }
  ): Promise<SurveyUserEntity | null> => {
    await pool.query(updateSurveyQuery, [
      surveyId,
      surveyData.title,
      surveyData.description,
    ])
    const surveyUpdated = await this.findSurveyById(surveyId)
    return surveyUpdated
  }

  public deleteAllSurveys = async (): Promise<void> => {
    await pool.query(deleteAllSurveysQuery)
  }
}
