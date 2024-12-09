import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/interfaces/repository.interface'
import { ProductModel } from '@/products/domain/models/product.model'
import {
  ProductId,
  ProductsRepository,
} from '@/products/domain/repositories/products.repository'
import { ILike, In, Repository } from 'typeorm'
import { Product } from '../entities/product.entity'
import { NotFoundError } from '@/common/domain/errors/not-found.error'
import { ConflictError } from '@/common/domain/errors/conflict.error'
import { inject, injectable } from 'tsyringe'
import { AbstractTypeormRepository } from '@/common/infra/typeorm/repositories/abstract-typeorm.repository'

@injectable()
export class ProductsTypeormRepository
  extends AbstractTypeormRepository<Product>
  implements ProductsRepository
{
  sortableFields: string[] = ['name', 'created_at']

  constructor(
    @inject('ProductsDefaultTypeormRepository')
    private productsRepository: Repository<Product>,
  ) {
    super(productsRepository)
  }

  async findByName(name: string): Promise<ProductModel> {
    const product = await this.productsRepository.findOneBy({ name })

    if (!product) {
      throw new NotFoundError(`Product not found using name ${name}`)
    }

    return product
  }

  async findAllByIds(ids: ProductId[]): Promise<ProductModel[]> {
    const productIds = ids.map(productId => productId.id)

    const productsFound = await this.productsRepository.find({
      where: { id: In(productIds) },
    })

    return productsFound
  }

  async conflictingName(productName: string): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: {
        name: productName,
      },
    })

    if (product) {
      throw new ConflictError('Name already used by another product')
    }
  }

  async search(props: SearchInput): Promise<SearchOutput<ProductModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false
    const dirOps = ['asc', 'desc']
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) || false
    const orderByField = validSort ? props.sort : 'created_at'
    const orderByDir = validSortDir ? props.sort_dir : 'desc'

    const [products, total] = await this.productsRepository.findAndCount({
      ...(props.filter && { where: { name: ILike(props.filter) } }),
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
