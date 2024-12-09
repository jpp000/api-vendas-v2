import { AbstractTypeormRepository } from '@/common/infra/typeorm/repositories/abstract-typeorm.repository'
import { User } from '../entities/user.entity'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/interfaces/repository.interface'
import { UserModel } from '@/users/domain/models/user.model'
import { ILike, Repository } from 'typeorm'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/common/domain/errors/not-found.error'
import { ConflictError } from '@/common/domain/errors/conflict.error'

@injectable()
export class UsersTypeormRepository
  extends AbstractTypeormRepository<User>
  implements UsersRepository
{
  sortableFields: string[] = ['name', 'email', 'created_at']

  constructor(
    @inject('UsersDefaultTypeormRepository')
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository)
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      throw new NotFoundError(`User not found with email: ${email}`)
    }

    return user
  }

  async findByName(name: string): Promise<UserModel> {
    const user = await this.usersRepository.findOne({
      where: {
        name,
      },
    })

    if (!user) {
      throw new NotFoundError(`User not found using name: ${name}`)
    }

    return user
  }

  async conflictingEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    })

    if (user) {
      throw new ConflictError(`User already registered using email: ${email}`)
    }
  }

  async search(props: SearchInput): Promise<SearchOutput<UserModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false
    const dirOps = ['asc', 'desc']
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) || false
    const orderByField = validSort ? props.sort : 'created_at'
    const orderByDir = validSortDir ? props.sort_dir : 'desc'

    const where = props.filter
      ? [
          { name: ILike(`%${props.filter}%`) },
          { email: ILike(`%${props.filter}%`) },
        ]
      : undefined

    const [products, total] = await this.usersRepository.findAndCount({
      ...(props.filter && { where }),
      order: { [orderByField]: orderByDir },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    })

    return {
      items: products,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: orderByField,
      sort_dir: orderByDir,
      filter: props.filter,
    }
  }
}
