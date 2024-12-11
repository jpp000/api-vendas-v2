import { inject, injectable } from 'tsyringe'
import { GetUserInput } from '../dtos/get-user.dto'
import { UserOutput } from '../dtos/user-output.dto'
import { UsersRepository } from '@/users/domain/repositories/users.repository'

export namespace DeleteUserUseCase {
  export type Input = GetUserInput

  export type Output = UserOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private readonly usersRepository: UsersRepository,
    ) {}

    async execute({ id }: Input): Promise<boolean> {
      await this.usersRepository.delete(id)

      return true
    }
  }
}