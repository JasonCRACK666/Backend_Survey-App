import { AccountEntity } from './AccountEntity'

import { v4 as uuid } from 'uuid'

export class AccountValue implements AccountEntity {
  id: string
  user_id: string
  avatar: string | null
  birthday: string | null
  phone_number: string | null
  address: string | null
  created_at: string
  updated_at: string

  constructor(user_id: string) {
    this.id = uuid()
    this.user_id = user_id
    this.avatar =
      'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'
    this.birthday = null
    this.phone_number = null
    this.address = null
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }
}
