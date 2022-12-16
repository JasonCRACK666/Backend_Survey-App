import { v4 as uuid } from 'uuid'

import request from 'supertest'

import app from '../src/app'

import { UserEntity } from '../src/user/domain/UserEntity'
import { AccountEntity } from '../src/account/domain/AccountEntity'
import { SurveyEntity } from '../src/survey/domain/SurveyEntity'
import {
  QuestionEntity,
  QuestionTypeEntity,
} from '../src/question/domain/QuestionEntity'
import { QuestionOptionEntity } from '../src/questionOption/domain/QuestionOptionEntity'

export const api = request(app)

export const TEST_USER: Omit<UserEntity, 'id'> = {
  username: 'JasonCrkTest',
  first_name: 'Emerzon Javier Test',
  last_name: 'Kolki Martinez Test',
  email: 'emerzonKolki@test.com',
  password: 'EmerzonKolki',
  is_admin: false,
}

export const TEST_USER_CREATE: UserEntity = {
  id: uuid(),
  username: 'JasonCrkJuan',
  first_name: 'Emerzon Javier Test',
  last_name: 'Kolki Martinez Test',
  email: 'emerzonKolkiMartinez@test.com',
  password: 'testJasonCrk',
  is_admin: false,
}

export const TEST_USER_USERNAME_IS_TAKEN: Omit<UserEntity, 'id'> = {
  username: TEST_USER_CREATE.username,
  first_name: TEST_USER.first_name,
  last_name: TEST_USER.last_name,
  email: TEST_USER.email,
  password: TEST_USER.password,
  is_admin: false,
}

export const TEST_USER_EMAIL_IS_TAKEN: Omit<UserEntity, 'id'> = {
  username: TEST_USER.username,
  first_name: TEST_USER.first_name,
  last_name: TEST_USER.last_name,
  email: TEST_USER_CREATE.email,
  password: TEST_USER.password,
  is_admin: false,
}

export const TEST_ACCOUNT: AccountEntity = {
  id: uuid(),
  user_id: TEST_USER_CREATE.id,
  avatar:
    'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg',
  address: '26 de Julio',
  phone_number: '989897634',
  birthday: new Date('August 19, 1975 23:15:30').toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// code-spell: disable
export const TEST_SURVEY: SurveyEntity = {
  id: uuid(),
  title: 'JasonCrk es lo mejor de la historia',
  description:
    '1234 sdfasd wr wrasdf adf sdf qwrwe af asdfa sdf asdf qr sdafd asdf asdfqwre rasdf sd',
  user_id: TEST_USER_CREATE.id,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
// code-spell: enable

export const TEST_QUESTION_TYPE_MULTI: QuestionTypeEntity = {
  id: uuid(),
  name: 'multi',
}

export const TEST_QUESTION_TYPE_TEXT: QuestionTypeEntity = {
  id: uuid(),
  name: 'text',
}

export const TEST_QUESTION_TEXT: QuestionEntity = {
  id: uuid(),
  question: '¿Cómo estas?',
  question_type_id: TEST_QUESTION_TYPE_TEXT.id,
  survey_id: TEST_SURVEY.id,
}

export const TEST_QUESTION_MULTI: QuestionEntity = {
  id: uuid(),
  question: '¿Cuál es tu color favorito?',
  question_type_id: TEST_QUESTION_TYPE_MULTI.id,
  survey_id: TEST_SURVEY.id,
}

export const TEST_QUESTION_OPTION: QuestionOptionEntity = {
  id: uuid(),
  question_id: TEST_QUESTION_MULTI.id,
  option: 'blue',
}
