import { HashProvider } from '@/users/domain/providers/hash.provider'
import * as bcrypt from 'bcryptjs'

export class BcryptHashProvider implements HashProvider {
  private readonly salt: number

  constructor() {
    this.salt = 10
  }

  hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.salt)
  }

  compare(payload: string, hashedPayload: string): Promise<boolean> {
    return bcrypt.compare(payload, hashedPayload)
  }
}
