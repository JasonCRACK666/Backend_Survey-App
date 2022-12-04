import app from '../src/app'
import { v4 as uuid } from 'uuid'

import request from 'supertest'
import { UserEntity } from '../src/user/domain/UserEntity'

export const api = request(app)

export const TEST_USER_CREATE: UserEntity = {
  id: uuid(),
  username: 'JasonCrk',
  firstname: 'Emerzon Javier Test',
  lastname: 'Kolki Martinez Test',
  email: 'emerzonKolkiMartinez@test.com',
  password: 'testJasonCrk',
}

export const TEST_USER: Omit<UserEntity, 'id'> = {
  username: 'JasonCrkTest',
  firstname: 'Emerzon Javier Test',
  lastname: 'Kolki Martinez Test',
  email: 'emerzonKolki@test.com',
  password: 'EmerzonKolki',
}
