import pool from '../../../db'

import { AccountEntity, AccountUserEntity } from '../../domain/AccountEntity'
import { AccountRepository } from '../../domain/AccountRepository'

import {
  selectAccountUserQuery,
  updateAccountUserQuery,
  createAccountQuery,
} from './SQLQuery'

export class PostgreSQLAccountRepository implements AccountRepository {
  findAccountByUserId = async (
    userId: string
  ): Promise<AccountUserEntity | null> => {
    const { rows: user } = await pool.query(selectAccountUserQuery, [userId])
    return user[0]
  }

  updateAccount = async (
    userId: string,
    accountData: Omit<
      AccountEntity,
      'id' | 'userId' | 'createdAt' | 'updatedAt'
    >
  ): Promise<AccountUserEntity | null> => {
    await pool.query(updateAccountUserQuery, [
      userId,
      accountData.avatar,
      accountData.birthday,
      accountData.phoneNumber,
      accountData.address,
    ])

    const account = await this.findAccountByUserId(userId)
    return account
  }

  createAccount = async (
    accountData: AccountEntity
  ): Promise<AccountUserEntity | null> => {
    await pool.query(createAccountQuery, [
      accountData.id,
      accountData.userId,
      accountData.avatar,
      accountData.birthday,
      accountData.phoneNumber,
      accountData.address,
      accountData.createdAt,
      accountData.updatedAt,
    ])

    const account = await this.findAccountByUserId(accountData.userId)
    return account
  }
}
