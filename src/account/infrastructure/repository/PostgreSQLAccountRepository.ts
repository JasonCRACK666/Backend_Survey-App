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
  public findAccountById = async (
    id: string
  ): Promise<AccountUserEntity | null> => {
    const { rows: user } = await pool.query(selectAccountUserByIdQuery, [id])
    return user[0]
  }

  public findAccountByUserId = async (
    userId: string
  ): Promise<AccountUserEntity | null> => {
    const { rows: user } = await pool.query(selectAccountUserByUserId, [userId])
    return user[0]
  }

  public updateAccount = async (
    id: string,
    accountData: Omit<
      AccountEntity,
      'id' | 'user_id' | 'created_at' | 'updated_at'
    >
  ): Promise<AccountUserEntity | null> => {
    await pool.query(updateAccountUserQuery, [
      id,
      accountData.avatar,
      accountData.birthday,
      accountData.phone_number,
      accountData.address,
    ])

    const account = await this.findAccountById(id)
    return account
  }

  public createAccount = async (
    accountData: AccountEntity
  ): Promise<AccountUserEntity | null> => {
    await pool.query(createAccountQuery, [
      accountData.id,
      accountData.user_id,
      accountData.avatar,
      accountData.birthday,
      accountData.phone_number,
      accountData.address,
      accountData.created_at,
      accountData.updated_at,
    ])

    const account = await this.findAccountById(accountData.id)
    return account
  }

  public deleteAllAccounts = async (): Promise<void> => {
    const query = `DELETE FROM account WHERE id = id`
    await pool.query(query)
  }
}
