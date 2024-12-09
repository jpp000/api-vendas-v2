import { NotFoundError } from '@/common/domain/errors/not-found.error'
import { UsersRepository } from '../../repositories/users.repository'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'
import { UserModel } from '../../models/user.model'
import { ConflictError } from '@/common/domain/errors/conflict.error'

export class UsersInMemoryRepository
  extends InMemoryRepository<UserModel>
  implements UsersRepository
{
  sortableFields: string[] = ['name', 'email', 'created_at']

  async findByName(name: string): Promise<UserModel> {
    const user = this.items.find(p => p.name === name)

    if (!user) {
      throw new NotFoundError(`User not found using name: ${name}`)
    }

    return user
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = this.items.find(e => e.email === email)

    if (!user) {
      throw new NotFoundError(`User not found with email: ${email}`)
    }

    return user
  }

  async conflictingEmail(email: string): Promise<void> {
    const user = this.items.find(e => e.email === email)

    if (user) {
      throw new ConflictError(`User already registered using email: ${email}`)
    }
  }

  protected async applyFilter(
    items: UserModel[],
    filter: string | null,
  ): Promise<UserModel[]> {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  protected async applySort(
    items: UserModel[],
    sort: string | null,
    sort_dir: string | null,
  ): Promise<UserModel[]> {
    return super.applySort(items, sort ?? 'created_at', sort_dir ?? 'desc')
  }
}
