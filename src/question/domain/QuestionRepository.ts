import {
  QuestionDetailEntity,
  QuestionEntity,
  QuestionTypeEntity,
} from './QuestionEntity'

export interface QuestionRepository {
  findQuestionTypeById: (
    questionTypeId: string
  ) => Promise<QuestionTypeEntity | null>
  findQuestionById: (questionId: string) => Promise<QuestionDetailEntity | null>
  findQuestionsBySurveyId: (
    surveyId: string
  ) => Promise<QuestionDetailEntity[] | null>
  createQuestion: (
    questionData: QuestionEntity
  ) => Promise<QuestionDetailEntity | null>
  deleteQuestion: (questionId: string) => Promise<void>
  deleteAllQuestions: () => Promise<void>
  createQuestionType: (
    questionTypeData: QuestionTypeEntity
  ) => Promise<QuestionTypeEntity | null>
}
