import { api, TEST_USER } from '../helpers'

import { PostgreSQLUserRepository } from '../../src/user/infrastructure/repository/PostgreSQLUserRepository'

const userRepository = new PostgreSQLUserRepository()

beforeEach(async () => {
  await userRepository.deleteAllUsers()
})

describe('POST /api/auth/signUp', () => {
  describe('', () => {})
})
