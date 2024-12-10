import { inject, injectable } from 'tsyringe'
import { UserOutput } from '../dtos/user-output.dto'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { HashProvider } from '@/users/domain/providers/hash.provider'
import { InvalidPasswordError } from '@/common/domain/errors/invalid-password.error'

export namespace UpdateUserPasswordUseCase {
  export type Input = {
    id: string
    oldPassword: string
    newPassword: string
  }

  export type Output = UserOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private readonly usersRepository: UsersRepository,

      @inject('HashProvider')
      private readonly hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const user = await this.usersRepository.findById(input.id)

      const passwordMatches = await this.hashProvider.compare(
        input.oldPassword,
        user.password,
      )

      if (!passwordMatches) {
        throw new InvalidPasswordError('Password does not match')
      }

      input.newPassword = await this.hashProvider.hash(input.newPassword)

      user.password = input.newPassword

      return this.usersRepository.save(user)
    }
  }
}
