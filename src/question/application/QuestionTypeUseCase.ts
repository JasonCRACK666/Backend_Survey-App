import { QuestionTypeEntity } from '../domain/QuestionEntity'
import { QuestionRepository } from '../domain/QuestionRepository'
import { QuestionTypeValue } from '../domain/QuestionTypeValue'

export class QuestionTypeUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  public createQuestionType = async (
    questionTypeName: string
  ): Promise<{ status: number; questionType: QuestionTypeEntity }> => {
    const questionTypeValue = new QuestionTypeValue(questionTypeName)

    let questionTypeCreated: QuestionTypeEntity | null = null
    try {
      questionTypeCreated = await this.questionRepository.createQuestionType(
        questionTypeValue
      )
    } catch (error) {
      throw {
        status: 404,
        error: 'Hubo un error, no se ha podido crear el tipo de pregunta',
      }
    }

    return {
      status: 200,
      questionType: questionTypeCreated!,
    }
  }

  public getAllQuestionTypes = async (): Promise<{
    status: number
    questionTypes: QuestionTypeEntity[]
  }> => {
    let questionTypes: QuestionTypeEntity[] = []

    try {
      questionTypes = await this.questionRepository.findAllQuestionTypes()
    } catch (error) {
      throw {
        status: 500,
        error: 'Hubo un error, no se puedo hacer la busqueda',
      }
    }

    return {
      status: 200,
      questionTypes,
    }
  }
}
