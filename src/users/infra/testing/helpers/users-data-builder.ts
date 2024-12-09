import { UserModel } from '@/users/domain/models/user.model'
import { faker } from '@faker-js/faker/.'
import { randomUUID } from 'crypto'

export function UsersDataBuilder(props: Partial<UserModel>): UserModel {
  return {
    id: props.id ?? randomUUID(),
    name: props.name ?? faker.person.firstName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? new Date(),
  }
}
