import { AccountEntity, AccountUserEntity } from './AccountEntity'

export interface AccountRepository {
  updateAccount: (
    userId: string,
    accountData: Omit<
      AccountEntity,
      'id' | 'userId' | 'createdAt' | 'updatedAt'
    >
  ) => Promise<AccountUserEntity | null>
  createAccount: (
    accountData: AccountEntity
  ) => Promise<AccountUserEntity | null>
  findAccountByUserId: (userId: string) => Promise<AccountUserEntity | null>
}
