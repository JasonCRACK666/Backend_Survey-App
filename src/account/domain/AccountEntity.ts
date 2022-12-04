export interface AccountEntity {
  id: string
  userId: string
  avatar: string | null
  birthday: Date | null
  phoneNumber: string | null
  address: string | null
  createdAt: Date
  updatedAt: Date
}

export interface AccountUserEntity {
  id: string
  username: string
  firstName: string
  lastName: string
  avatar: string | null
  birthday: Date | null
  phoneNumber: string | null
  address: string | null
  createdAt: Date
  updatedAt: Date
}
