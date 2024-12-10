import { inject, injectable } from 'tsyringe'
import { UserOutput } from '../dtos/user-output.dto'
import { UsersRepository } from '@/users/domain/repositories/users.repository'

export namespace UpdateUserUseCase {
  export type Input = {
    id: string
    name: string
    email: string
  }

  export type Output = UserOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private readonly usersRepository: UsersRepository,
    ) {}

    async execute({ id, name, email }: Input): Promise<Output> {
      const user = await this.usersRepository.findById(id)

      if (user.email !== email) {
        await this.usersRepository.conflictingEmail(email)
      }

      if (name) {
        user.name = name
      }

      if (email) {
        user.email = email
      }

      return this.usersRepository.save(user)
    }
  }
}
