import { api, TEST_ACCOUNT, TEST_USER_CREATE } from '../helpers'

import { AccountUserEntity } from '../../src/account/domain/AccountEntity'

import { PostgreSQLAccountRepository } from '../../src/account/infrastructure/repository/PostgreSQLAccountRepository'
import { PostgreSQLUserRepository } from '../../src/user/infrastructure/repository/PostgreSQLUserRepository'

const accountRepository = new PostgreSQLAccountRepository()
const userRepository = new PostgreSQLUserRepository()

let account: AccountUserEntity | null

beforeAll(async () => {
  await userRepository.deleteAllUsers()
  await accountRepository.deleteAllAccounts()
})

beforeEach(async () => {
  await userRepository.deleteAllUsers()
  await accountRepository.deleteAllAccounts()
  await userRepository.registerUser(TEST_USER_CREATE)
  account = await accountRepository.createAccount(TEST_ACCOUNT)
})

describe('GET /api/accounts/:accountId', () => {
  describe('The ID belongs to an account', () => {
    test('should respond with a status code 200 and Content-Type "Application JSON"', async () => {
      await api
        .get(`/api/accounts/${account?.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('should return a JSON with a status code 200', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.status).toBe(200)
    })

    // ! This is optional
    test('should return a JSON with a account object', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account).toBeDefined()
    })

    test('the account object should have the ID attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.id).toBe(account?.id)
    })

    test('the account object should have the username attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.username).toBe(
        TEST_USER_CREATE.username
      )
    })

    test('the account object should have the first_name attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.first_name).toBe(
        TEST_USER_CREATE.first_name
      )
    })

    test('the account object should have the last_name attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.last_name).toBe(
        TEST_USER_CREATE.last_name
      )
    })

    test('the account object should have the avatar attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.avatar).toBe(account?.avatar)
    })

    test('the account object should have the birthday attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.birthday).toEqual(
        new Date(account?.birthday!).toISOString()
      )
    })

    test('the account object should have the address attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.address).toBe(account?.address)
    })

    test('the account object should have the phone number attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.phone_number).toBe(
        account?.phone_number
      )
    })

    test('the account object should have the "created at" attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.created_at).toEqual(
        new Date(account?.created_at!).toISOString()
      )
    })

    test('the account object should have the "updated at" attribute with its respective value', async () => {
      const responseAccount = await api.get(`/api/accounts/${account?.id}`)
      expect(responseAccount.body.account.updated_at).toEqual(
        new Date(account?.updated_at!).toISOString()
      )
    })
  })

  describe('The ID does not belong to an account.', () => {
    test('should respond with a status code 404 and Content-Type "Application JSON"', async () => {
      await api
        .get(`/api/accounts/0c2d865c-d6be-4246-b860-08870b60c535`)
        .expect(404)
        .expect('Content-Type', /application\/json/)
    })

    test('should return a JSON with a status code 404', async () => {
      const responseAccount = await api.get(
        `/api/accounts/0c2d865c-d6be-4246-b860-08870b60c535`
      )
      expect(responseAccount.body.status).toBe(404)
    })

    test('should return a JSON with a error message', async () => {
      const responseAccount = await api.get(
        `/api/accounts/0c2d865c-d6be-4246-b860-08870b60c535`
      )
      expect(responseAccount.body.error).toBe(
        'No se ha encontrado ninguna cuenta'
      )
    })
  })
})
