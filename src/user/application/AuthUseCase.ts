import jwt from 'jsonwebtoken'
import config from '../../config'

import { PasswordEncrypter } from '../infrastructure/utils/passwordEncrypter'

import { UserEntity } from '../domain/UserEntity'
import { UserValue } from '../domain/UserValue'
import { UserRepository } from '../domain/UserRepository'
import { AccountValue } from '../../account/domain/AccountValue'
import { AccountUserEntity } from '../../account/domain/AccountEntity'
import { AccountRepository } from '../../account/domain/AccountRepository'

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) { }

  public registerUser = async (
    userData: Omit<UserEntity, 'id' | 'is_admin'>
  ): Promise<{
    status: number,
    message: string
  }> => {
    let userFoundForUsername: UserEntity | null
    try {
      userFoundForUsername = await this.userRepository.findUserByUsername(
        userData.username
      )
    } catch (error) {
      throw {
        status: 500,
        error:
          'Hubo un error, no se puedo hacer la búsqueda del usuario mediante el Nombre de usuario',
      }
    }

    if (userFoundForUsername)
      throw {
        status: 406,
        error: 'El nombre de usuario ya esta en uso, utilice otro',
      }

    let userFoundForEmail: UserEntity | null
    try {
      userFoundForEmail = await this.userRepository.findUserByEmail(
        userData.email
      )
    } catch (error) {
      throw {
        status: 500,
        error:
          'Hubo un error, no se puedo hacer la búsqueda del usuario mediante el Email',
      }
    }

    if (userFoundForEmail)
      throw {
        status: 406,
        error: 'El correo electrónico ya esta en uso, utilice otro',
      }

    const userValue = new UserValue(userData)

    let userRegistered: UserEntity | null
    try {
      userRegistered = await this.userRepository.registerUser(userValue)
    } catch (error) {
      throw {
        status: 500,
        error: 'Hubo un error, no se ha podido crear el usuario',
      }
    }

    if (!userRegistered)
      throw {
        status: 404,
        error: 'El usuario no ha sido creado',
      }

    const accountValue = new AccountValue(userRegistered.id)

    let accountUser: AccountUserEntity | null
    try {
      accountUser = await this.accountRepository.createAccount(accountValue)
    } catch (error) {
      throw {
        status: 500,
        error: 'Hubo un error, no se ha podido crear la cuenta',
      }
    }

    if (!accountUser)
      throw {
        status: 404,
        error: 'No se ha podido crear su cuenta',
      }

    return { status: 200, message: 'Usted de ha registrado' }
  }

  public loginUser = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user)
      throw {
        status: 404,
        error: 'No existe ningún usuario con el correo ingresado',
      }

    const matchPassword = await PasswordEncrypter.comparePassword(
      password,
      user.password
    )
    if (!matchPassword)
      throw {
        status: 404,
        error: 'La contraseña con incide con la cuenta a ingresar',
      }

    const token = jwt.sign(
      { id: user.id, username: user.username, is_admin: user.is_admin },
      config.SECRET!,
      {
        expiresIn: '12h',
      }
    )

    return {
      status: 200,
      token,
    }
  }

  public getUserWithTheAccessToken = async (
    userId: string
  ): Promise<{ status: number; user: Pick<UserEntity, 'id' | 'username' | 'is_admin'> }> => {
    let user: UserEntity | null
    try {
      user = await this.userRepository.findUserById(userId)
    } catch (error) {
      throw {
        status: 500,
        error: 'Hubo un error, no se puedo hacer la búsqueda del usuario',
      }
    }

    if (!user)
      throw {
        status: 404,
        error: 'El usuario no existe',
      }

    return {
      status: 200,
      user: {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin
      },
    }
  }

  public verifyTokenIsValid = async (token: string): Promise<{ status: number }> => {
    let user!: Pick<UserEntity, 'id' | 'username' | 'is_admin'>
    try {
      user = jwt.verify(token, config.SECRET!) as Pick<UserEntity, 'id' | 'username' | 'is_admin'>
    } catch (error) {
      throw {
        status: 400,
        error: 'El token es invalido'
      }
    }

    if (!user) throw {
      status: 404,
      error: 'El usuario no existe'
    }

    return {
      status: 200
    }
  }
}

