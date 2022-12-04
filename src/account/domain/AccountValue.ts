import { AccountEntity } from './AccountEntity'

import { v4 as uuid } from 'uuid'

export class AccountValue implements AccountEntity {
  id: string
  userId: string
  avatar: string | null
  birthday: Date | null
  phoneNumber: string | null
  address: string | null
  createdAt: Date
  updatedAt: Date

  constructor(userId: string) {
    this.id = uuid()
    this.userId = userId
    this.avatar =
      'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'
    this.birthday = null
    this.phoneNumber = null
    this.address = null
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
