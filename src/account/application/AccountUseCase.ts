import { AccountEntity, AccountUserEntity } from '../domain/AccountEntity'
import { AccountRepository } from '../domain/AccountRepository'
import { AccountValue } from '../domain/AccountValue'

export class AccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public getDetailAccount = async (
    id: string
  ): Promise<{ status: number; account: AccountUserEntity }> => {
    const accountUser = await this.accountRepository.findAccountById(id)

    if (!accountUser)
      throw {
        status: 404,
        error: 'No se ha encontrado ninguna cuenta',
      }

    return {
      status: 200,
      account: accountUser,
    }
  }

  public createAccountByUserId = async (
    userId: string
  ): Promise<{ status: number; account: AccountUserEntity }> => {
    const accountValue = new AccountValue(userId)
    const accountUser = await this.accountRepository.createAccount(accountValue)

    if (!accountUser)
      throw {
        status: 404,
        error: 'La cuenta no se ha creado',
      }

    return {
      status: 200,
      account: accountUser,
    }
  }

  public updateAccount = async (
    id: string,
    {
      address,
      avatar,
      birthday,
      phone_number,
    }: Omit<AccountEntity, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<{
    status: number
    account: AccountUserEntity
  }> => {
    const account = await this.accountRepository.updateAccount(id, {
      address,
      avatar,
      birthday,
      phone_number,
    })

    if (!account)
      throw {
        status: 500,
        error: 'Hubo un error en el servidor',
      }

    return {
      status: 200,
      account,
    }
  }
}
