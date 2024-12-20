import { inject, injectable } from 'tsyringe'
import { UserOutput } from '../dtos/user-output.dto'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { GetUserInput } from '../dtos/get-user.dto'

export namespace GetUserUseCase {
  export type Input = GetUserInput

  export type Output = UserOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private readonly usersRepository: UsersRepository,
    ) {}

    async execute({ id }: Input): Promise<Output> {
      return this.usersRepository.findById(id)
    }
  }
}
