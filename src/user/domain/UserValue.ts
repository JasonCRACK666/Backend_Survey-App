import { UserEntity } from './UserEntity'

import { v4 as uuid } from 'uuid'

interface UserValueProps {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export class UserValue implements UserEntity {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  password: string

  constructor({
    username,
    first_name,
    last_name,
    email,
    password,
  }: UserValueProps) {
    this.id = uuid()
    this.username = username
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.password = password
  }
}
