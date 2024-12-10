import { inject, injectable } from 'tsyringe'
import { UserOutput } from '../dtos/user-output.dto'
import { UsersRepository } from '@/users/domain/repositories/users.repository'

export namespace GetUserUseCase {
  export type Input = {
    id: string
  }

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
