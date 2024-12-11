import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { HashProvider } from '@/users/domain/providers/hash.provider'
import { InvalidPasswordError } from '@/common/domain/errors/invalid-password.error'
import { TokenProvider } from '@/users/domain/providers/token.provider'
import { TokenPayload } from '@/users/domain/interfaces/token-payload.interface'

export namespace LoginUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    user: TokenPayload
    token: string
  }

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private readonly usersRepository: UsersRepository,

      @inject('HashProvider')
      private readonly hashProvider: HashProvider,

      @inject('TokenProvider')
      private readonly tokenProvider: TokenProvider,
    ) {}

    async execute({ email, password }: Input): Promise<Output> {
      const user = await this.usersRepository.findByEmail(email)

      const passwordMatches = await this.hashProvider.compare(
        password,
        user.password,
      )

      if (!passwordMatches) {
        throw new InvalidPasswordError('Password does not match')
      }

      const payload: TokenPayload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          invalid: false,
        },
      }

      const token = await this.tokenProvider.sign(payload)

      return {
        user: payload,
        token,
      }
    }
  }
}
