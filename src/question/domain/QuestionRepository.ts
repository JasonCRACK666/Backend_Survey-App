import { QuestionEntity, QuestionTypeEntity } from './QuestionEntity';

export interface QuestionRepository {
  findQuestionTypeById: (questionTypeId: string) => Promise<QuestionTypeEntity | null>
  findQuestionById: (questionId: string) => Promise<QuestionEntity | null>
  createQuestion: (questionData: QuestionEntity) => Promise<QuestionEntity | null>
  deleteQuestion: (questionId: string) => Promise<void>
  deleteAllQuestions: () => Promise<void>
}
