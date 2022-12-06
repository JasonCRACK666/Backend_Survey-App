import {
  api,
  TEST_USER,
  TEST_USER_CREATE,
  TEST_USER_EMAIL_IS_TAKEN,
  TEST_USER_USERNAME_IS_TAKEN,
} from '../helpers'

import { PostgreSQLUserRepository } from '../../src/user/infrastructure/repository/PostgreSQLUserRepository'

const userRepository = new PostgreSQLUserRepository()

jest.setTimeout(6000)

beforeEach(async () => {
  await userRepository.deleteAllUsers()
})

describe('POST /api/auth/signUp', () => {
  describe('The data sent is correct', () => {
    test('should respond with a status code 200 and Content-Type is "Application JSON"', async () => {
      await api
        .post('/api/auth/signUp')
        .send(TEST_USER)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('should return a JSON with a status code 200', async () => {
      const responseSignUp = await api.post('/api/auth/signUp').send(TEST_USER)
      expect(responseSignUp.body.status).toBe(200)
    })

    test('should return a JSON with a user registered', async () => {
      const responseSignUp = await api.post('/api/auth/signUp').send(TEST_USER)
      expect(responseSignUp.body.user).toBeDefined()
    })
  })

  describe('The data sent is incomplete or missing', () => {
    test('should respond with a status code 403 and', async () => {
      await api.post('/api/auth/signUp').send({}).expect(403)
    })

    test('should respond with a Content-Type "Application JSON"', async () => {
      await api
        .post('/api/auth/signUp')
        .send({})
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('The username is already taken', () => {
    test('should respond with a status code 406 and Content-Type "Application JSON"', async () => {
      await userRepository.registerUser(TEST_USER_CREATE)
      await api
        .post('/api/auth/signUp')
        .send(TEST_USER_USERNAME_IS_TAKEN)
        .expect(406)
        .expect('Content-Type', /application\/json/)
    })

    test('should return a JSON with a status code 406', async () => {
      await userRepository.registerUser(TEST_USER_CREATE)
      const responseSignUp = await api
        .post('/api/auth/signUp')
        .send(TEST_USER_USERNAME_IS_TAKEN)

      expect(responseSignUp.body.status).toBe(406)
    })

    test('should return a JSON with a error message', async () => {
      await userRepository.registerUser(TEST_USER_CREATE)
      const responseSignUp = await api
        .post('/api/auth/signUp')
        .send(TEST_USER_USERNAME_IS_TAKEN)

      expect(responseSignUp.body.error).toBe(
        'El nombre de usuario ya esta en uso, utilice otro'
      )
    })
  })

  describe('Email is already in use', () => {
    test('should respond with a status code 406 and Content-Type "Application JSON"', async () => {
      await userRepository.registerUser(TEST_USER_CREATE)
      await api
        .post('/api/auth/signUp')
        .send(TEST_USER_EMAIL_IS_TAKEN)
        .expect(406)
        .expect('Content-Type', /application\/json/)
    })

    test('should return a JSON with a status code 406', async () => {
      await userRepository.registerUser(TEST_USER_CREATE)
      const responseSignUp = await api
        .post('/api/auth/signUp')
        .send(TEST_USER_EMAIL_IS_TAKEN)

      expect(responseSignUp.body.status).toBe(406)
    })

    test('should return a JSON with a error message', async () => {
      await userRepository.registerUser(TEST_USER_CREATE)
      const responseSignUp = await api
        .post('/api/auth/signUp')
        .send(TEST_USER_EMAIL_IS_TAKEN)

      expect(responseSignUp.body.error).toBe(
        'El correo electrónico ya esta en uso, utilice otro'
      )
    })
  })
})
