import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(data: ICreateUserDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(data.email)
    if (user) {
      throw new AppError('User already exists')
    }
    const passwordHash = await hash(data.password, 8)
    await this.usersRepository.create({ ...data, password: passwordHash })
  }
}

export { CreateUserUseCase }
