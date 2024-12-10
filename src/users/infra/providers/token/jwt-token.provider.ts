import { env } from '@/common/infra/env'
import { TokenPayload } from '@/users/domain/interfaces/token-payload.interface'
import { TokenProvider } from '@/users/domain/providers/token.provider'
import jwt from 'jsonwebtoken'

export class JwtTokenProvider implements TokenProvider {
  protected readonly secret = env.JWT_SECRET
  protected readonly expiresIn = env.JWT_EXPIRES_IN

  async verify(token: string): Promise<TokenPayload> {
    return jwt.verify(token, this.secret) as TokenPayload
  }

  async sign(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    })
  }
}
