import { UserEntity } from '../../domain/UserEntity'
import { UserRepository } from '../../domain/UserRepository'

export const MOCK_USER: UserEntity = {
  id: '3f4fa03e-493f-4fc1-9d4a-5b795bd43689',
  email: 'emerzonTest@gmail',
  firstname: 'Emerzon Javier',
  lastname: 'Kolki Martinez',
  password: '1234qwerasdf',
  username: 'JasonCrk',
}

export class MockUserRepository implements UserRepository {
  public findUserById = async (_id: string): Promise<UserEntity | null> => {
    const user = MOCK_USER
    return user
  }

  public findUserByEmail = async (
    _email: string
  ): Promise<UserEntity | null> => {
    const user = MOCK_USER
    return user
  }

  public registerUser = async (
    _newUser: UserEntity
  ): Promise<UserEntity | null> => {
    const user = MOCK_USER
    return user
  }

  public deleteAllUsers = async (): Promise<void> => {}

  public deleteUser = async (id: string): Promise<void> => {}

  public updateUser = async (id: string): Promise<void> => {}
}
