import { AccountEntity, AccountUserEntity } from './AccountEntity'

export interface AccountRepository {
  updateAccount: (
    accountId: string,
    accountData: Partial<
      Omit<AccountEntity, 'id' | 'user_id' | 'created_at' | 'updated_at'>
    >
  ) => Promise<AccountUserEntity | null>
  createAccount: (
    accountData: AccountEntity
  ) => Promise<AccountUserEntity | null>
  findAccountByUserId: (userId: string) => Promise<AccountUserEntity | null>
  findAccountById: (accountId: string) => Promise<AccountUserEntity | null>
  deleteAllAccounts: () => Promise<void>
}
