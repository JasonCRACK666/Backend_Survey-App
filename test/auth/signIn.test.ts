import { api, TEST_USER_CREATE } from '../helpers'

import { PostgreSQLUserRepository } from '../../src/user/infrastructure/repository/PostgreSQLUserRepository'

const userRepository = new PostgreSQLUserRepository()

beforeAll(async () => {
  await userRepository.deleteAllUsers()
})

beforeEach(async () => {
  await userRepository.deleteAllUsers()
  await userRepository.registerUser(TEST_USER_CREATE)
})

describe('POST /api/auth/signIn', () => {
  describe('Data send is correctly', () => {
    test('should respond status 200 and Content-Type "Application JSON"', async () => {
      await api
        .post('/api/auth/signIn')
        .send({
          email: TEST_USER_CREATE.email,
          password: TEST_USER_CREATE.password,
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('should return a JSON with a status code 200', async () => {
      const responseSignIn = await api.post('/api/auth/signIn').send({
        email: TEST_USER_CREATE.email,
        password: TEST_USER_CREATE.password,
      })

      expect(responseSignIn.body.status).toBe(200)
    })

    test('should return a JSON with a access token', async () => {
      const responseSignIn = await api.post('/api/auth/signIn').send({
        email: TEST_USER_CREATE.email,
        password: TEST_USER_CREATE.password,
      })

      expect(responseSignIn.body.token).toBeDefined()
    })
  })

  describe('Missing email or password', () => {
    test('should respond with a status code 403', async () => {
      await api.post('/api/auth/signIn').send({}).expect(403)
    })

    test('should respond in header => "Content-Type": "application/json"', async () => {
      await api
        .post('/api/auth/signIn')
        .send({})
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('The email does not belong to any account', () => {
    test('should respond with a status code 404', async () => {
      await api
        .post('/api/auth/signIn')
        .send({ email: 'fake@fake.com', password: TEST_USER_CREATE.password })
        .expect(404)
    })

    test('should return a json with a status code 406', async () => {
      const responseSignIn = await api
        .post('/api/auth/signIn')
        .send({ email: 'fake@fake.com', password: TEST_USER_CREATE.password })
      expect(responseSignIn.body.status).toBe(404)
    })

    test('should return a json with a error message', async () => {
      const responseSignIn = await api.post('/api/auth/signIn').send({
        email: 'fake@fake.com',
        password: TEST_USER_CREATE.password,
      })
      expect(responseSignIn.body.error).toBe(
        'No existe ningún usuario con el correo ingresado'
      )
    })
  })

  describe('The password does not match the found account', () => {
    test('should respond with a status code 404', async () => {
      await api
        .post('/api/auth/signIn')
        .send({ email: TEST_USER_CREATE.email, password: 'PasswordFalsy' })
        .expect(404)
    })

    test('should return a json with a status code 404', async () => {
      const responseSignIn = await api
        .post('/api/auth/signIn')
        .send({ email: TEST_USER_CREATE.email, password: 'PasswordFalsy' })
      expect(responseSignIn.body.status).toBe(404)
    })

    test('should return a json with a error message', async () => {
      const responseSignIn = await api.post('/api/auth/signIn').send({
        email: TEST_USER_CREATE.email,
        password: 'PasswordFalsy',
      })
      expect(responseSignIn.body.error).toBe(
        'La contraseña con incide con la cuenta a ingresar'
      )
    })
  })
})
