import bcryptjs from 'bcryptjs'

export class PasswordEncrypter {
  static hashPassword = async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10)
    return await bcryptjs.hash(password, salt)
  }

  static comparePassword = async (
    password: string,
    comparePass: string
  ): Promise<boolean> => {
    return await bcryptjs.compare(password, comparePass)
  }
}
