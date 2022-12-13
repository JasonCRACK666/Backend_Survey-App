import { UserEntity } from '../../domain/UserEntity'
import { UserRepository } from '../../domain/UserRepository'

import pool from '../../../db'

import { PasswordEncrypter } from '../utils/passwordEncrypter'

export class PostgreSQLUserRepository implements UserRepository {
  public findAllUsers = async (): Promise<UserEntity[]> => {
    const query = `SELECT * FROM users`
    const { rows: users } = await pool.query(query)
    return users
  }

  public findUserById = async (id: string): Promise<UserEntity | null> => {
    const query = `SELECT * FROM users WHERE id = $1`
    const { rows: user } = await pool.query(query, [id])
    return user[0]
  }

  public findUserByEmail = async (
    email: string
  ): Promise<UserEntity | null> => {
    const query = `SELECT * FROM users WHERE email = $1`
    const { rows: user } = await pool.query(query, [email])
    return user[0]
  }

  public findUserByUsername = async (
    username: string
  ): Promise<UserEntity | null> => {
    const query = `SELECT * FROM users WHERE username = $1`
    const { rows: user } = await pool.query(query, [username])
    return user[0]
  }

  public registerUser = async (
    newUser: UserEntity
  ): Promise<UserEntity | null> => {
    const query = `INSERT INTO users (id, username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5, $6)`
    const password = await PasswordEncrypter.hashPassword(newUser.password)
    await pool.query(query, [
      newUser.id,
      newUser.username,
      newUser.first_name,
      newUser.last_name,
      newUser.email,
      password,
    ])
    const user = await this.findUserByEmail(newUser.email)
    return user
  }

  public deleteUser = async (id: string): Promise<void> => {
    const query = `DELETE FROM users WHERE id = $1`
    await pool.query(query, [id])
  }

  public deleteAllUsers = async (): Promise<void> => {
    const query = `DELETE FROM users WHERE id = id`
    await pool.query(query)
  }

  public updateUser = async (
    id: string,
    userData: Omit<UserEntity, 'id' | 'is_admin'>
  ): Promise<void> => {}
}
