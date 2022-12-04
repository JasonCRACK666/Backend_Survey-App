import { UserEntity } from './UserEntity'

export interface UserRepository {
  findAllUsers: () => Promise<UserEntity[]>
  findUserById: (id: string) => Promise<UserEntity | null>
  findUserByEmail: (email: string) => Promise<UserEntity | null>
  registerUser: (newUser: UserEntity) => Promise<UserEntity | null>
  deleteUser: (id: string) => Promise<void>
  deleteAllUsers: () => Promise<void>
  updateUser: (id: string) => Promise<void>
  findUserByUsername: (username: string) => Promise<UserEntity | null>
}
