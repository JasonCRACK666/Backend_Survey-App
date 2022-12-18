import { v4 as uuid } from 'uuid'

import { UserEntity } from '../../domain/UserEntity'
import { UserRepository } from '../../domain/UserRepository'

export const MOCK_USER: UserEntity = {
  id: uuid(),
  email: 'emerzonTest@gmail',
  first_name: 'Emerzon Javier',
  last_name: 'Kolki Martinez',
  password: '1234qwerasdf',
  username: 'JasonCrk',
  is_admin: false,
}

export class MockUserRepository implements UserRepository {
  public findAllUsers = async (): Promise<UserEntity[]> => {
    const users: UserEntity[] = []
    return users
  }

  public findUserByUsername = async (
    _username: string
  ): Promise<UserEntity | null> => {
    const user = MOCK_USER
    return user
  }

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

  public deleteAllUsers = async (): Promise<void> => { }

  public deleteUser = async (id: string): Promise<void> => { }

  public updateUser = async (id: string): Promise<void> => { }
}
