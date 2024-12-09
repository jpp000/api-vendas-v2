import { Repository, FindManyOptions, DeepPartial } from 'typeorm'
import { NotFoundError } from '@/common/domain/errors/not-found.error'
import { BaseEntity } from '../entities/base.entity'
import { RepositoryInterface } from '@/common/domain/repositories/interfaces/repository.interface'

export abstract class AbstractTypeormRepository<Entity extends BaseEntity>
  implements Omit<RepositoryInterface<Entity, DeepPartial<Entity>>, 'search'>
{
  constructor(protected readonly repository: Repository<Entity>) {}

  create(props: DeepPartial<Entity>): Entity {
    return this.repository.create(props)
  }

  save(entity: Entity | DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity)
  }

  async findById(id: any): Promise<Entity> {
    const entity = await this.repository.findOne({ where: { id } })
    if (!entity) {
      throw new NotFoundError(`Entity not found with ID: ${id}`)
    }
    return entity
  }

  async update(model: any): Promise<Entity> {
    await this.findById(model.id)
    await this.repository.update({ id: model.id }, model)
    return model
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findById(id)
    await this.repository.remove(entity)
  }

  findAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options)
  }
}
