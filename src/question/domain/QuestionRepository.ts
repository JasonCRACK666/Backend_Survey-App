import { QuestionEntity, QuestionTypeEntity } from './QuestionEntity';

export interface QuestionRepository {
  createQuestion: (questionData: QuestionEntity) => Promise<QuestionEntity | null>
  deleteQuestion: (questionId: string) => Promise<void>
  findQuestionTypeById: (questionTypeId: string) => Promise<QuestionTypeEntity | null>
  findQuestionById: (questionId: string) => Promise<QuestionEntity | null>
}