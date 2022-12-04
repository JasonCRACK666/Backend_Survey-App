import { UserEntity } from './UserEntity'

import { v4 as uuid } from 'uuid'

interface UserValueProps {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
}

export class UserValue implements UserEntity {
  id: string
  username: string
  firstname: string
  lastname: string
  email: string
  password: string

  constructor({
    username,
    firstname,
    lastname,
    email,
    password,
  }: UserValueProps) {
    this.id = uuid()
    this.username = username
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
  }
}
