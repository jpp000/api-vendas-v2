import { inject, injectable } from 'tsyringe'
import { UserOutput } from '../dtos/user-output.dto'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { HashProvider } from '@/users/domain/providers/hash.provider'

export namespace CreateUserUseCase {
  export type Input = {
    name: string
    email: string
    password: string
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
      await this.usersRepository.conflictingEmail(input.email)

      const user = this.usersRepository.create(input)

      const hashedPassword = await this.hashProvider.hash(input.password)
      user.password = hashedPassword

      return this.usersRepository.save(user)
    }
  }
}
