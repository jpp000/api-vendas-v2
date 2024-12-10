import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/interfaces/repository.interface'
import { UserOutput } from '../dtos/user-output.dto'
import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '@/users/domain/repositories/users.repository'

export namespace SearchUsersUseCase {
  export type Input = SearchInput

  export type Output = SearchOutput<UserOutput>

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private readonly usersRepository: UsersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      return this.usersRepository.search(input)
    }
  }
}
