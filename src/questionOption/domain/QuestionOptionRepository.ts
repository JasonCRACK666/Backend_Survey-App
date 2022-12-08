import { QuestionOptionEntity } from './QuestionOptionEntity'

export interface QuestionOptionRepository {
  findQuestionOptionById: (questionOptionId: string) => Promise<QuestionOptionEntity | null>
  createQuestionOption: (questionOptionData: QuestionOptionEntity) => Promise<QuestionOptionEntity | null>
  deleteQuestionOption: (questionOptionId: string) => Promise<void>
  deleteAllQuestionOptions: () => Promise<void>
}
