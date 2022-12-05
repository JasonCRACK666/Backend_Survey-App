import pool from '../../../db'

import { AccountEntity, AccountUserEntity } from '../../domain/AccountEntity'
import { AccountRepository } from '../../domain/AccountRepository'

import {
  selectAccountUserByUserId,
  selectAccountUserByIdQuery,
  updateAccountUserQuery,
  createAccountQuery,
} from './SQLQuery'

export class PostgreSQLAccountRepository implements AccountRepository {
  findAccountById = async (id: string): Promise<AccountUserEntity | null> => {
    const { rows: user } = await pool.query(selectAccountUserByIdQuery, [id])
    return user[0]
  }

  findAccountByUserId = async (
    userId: string
  ): Promise<AccountUserEntity | null> => {
    const { rows: user } = await pool.query(selectAccountUserByUserId, [userId])
    return user[0]
  }

  updateAccount = async (
    id: string,
    accountData: Omit<
      AccountEntity,
      'id' | 'userId' | 'createdAt' | 'updatedAt'
    >
  ): Promise<AccountUserEntity | null> => {
    await pool.query(updateAccountUserQuery, [
      id,
      accountData.avatar,
      accountData.birthday,
      accountData.phoneNumber,
      accountData.address,
    ])

    const account = await this.findAccountById(id)
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
