import { UserTokenModel } from '../models/user-token.model'

export interface UsersTokensRepository {
  clear(): Promise<void>
  findByToken(token: string): Promise<UserTokenModel>
  generate(user_id: string): Promise<UserTokenModel>
}
