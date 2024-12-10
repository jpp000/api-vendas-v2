import { TokenPayload } from '../interfaces/token-payload.interface'

export interface TokenProvider {
  verify(token: string): Promise<TokenPayload>
  sign(payload: TokenPayload): Promise<string>
}
