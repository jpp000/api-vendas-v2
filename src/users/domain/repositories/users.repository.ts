import { RepositoryInterface } from '@/common/domain/repositories/interfaces/repository.interface'
import { UserModel } from '../models/user.model'

export type CreateUserProps = {
  id?: string
  name: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
}

export interface UsersRepository
  extends RepositoryInterface<UserModel, CreateUserProps> {
  findByEmail(email: string): Promise<UserModel>
  findByName(name: string): Promise<UserModel>
  conflictingEmail(email: string): Promise<void>
}
