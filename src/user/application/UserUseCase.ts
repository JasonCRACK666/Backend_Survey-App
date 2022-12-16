import { UserEntity } from '../domain/UserEntity'
import { UserRepository } from '../domain/UserRepository'

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public getDetailUser = async (
    id: string
  ): Promise<{
    status: number
    user: Omit<UserEntity, 'is_admin' | 'password'>
  }> => {
    let user: UserEntity | null
    try {
      user = await this.userRepository.findUserById(id)
    } catch (error) {
      throw {
        status: 500,
        error: 'Hubo un error, no se puedo realizar la búsqueda del usuario',
      }
    }

    if (!user)
      throw {
        status: 404,
        error: `No se ha encontrado ningún usuario con ID ${id}`,
      }

    return {
      status: 200,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    }
  }
}
