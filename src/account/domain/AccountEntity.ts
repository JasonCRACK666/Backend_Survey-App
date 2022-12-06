export interface AccountEntity {
  id: string
  user_id: string
  avatar: string | null
  birthday: string | null
  phone_number: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export interface AccountUserEntity {
  id: string
  username: string
  first_name: string
  last_name: string
  avatar: string | null
  birthday: string | null
  phone_number: string | null
  address: string | null
  created_at: string
  updated_at: string
}
