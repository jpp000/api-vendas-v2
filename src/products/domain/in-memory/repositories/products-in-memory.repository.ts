import { ConflictError } from '@/common/domain/errors/conflict.error'
import { NotFoundError } from '@/common/domain/errors/not-found.error'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'
import { ProductModel } from '@/products/domain/models/product.model'
import {
  ProductId,
  ProductsRepository,
} from '@/products/domain/repositories/products.repository'

export class ProductsInMemoryRepository
  extends InMemoryRepository<ProductModel>
  implements ProductsRepository
{
  sortableFields: string[] = ['name', 'price', 'created_at']

  async findByName(name: string): Promise<ProductModel> {
    const product = this.items.find(p => p.name === name)

    if (!product) {
      throw new NotFoundError(`Product not found using name ${name}`)
    }

    return product
  }

  async findAllByIds(ids: ProductId[]): Promise<ProductModel[]> {
    const products = Promise.all(
      ids.map(productId => this.findById(productId.id)),
    )
    return products
  }

  async conflictingName(name: string): Promise<void> {
    const product = this.items.find(p => p.name === name)
    if (product) {
      throw new ConflictError('Name already used on another product')
    }
  }

  protected async applyFilter(
    items: ProductModel[],
    filter: string | null,
  ): Promise<ProductModel[]> {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  protected async applySort(
    items: ProductModel[],
    sort: string | null,
    sort_dir: string | null,
  ): Promise<ProductModel[]> {
    return super.applySort(items, sort ?? 'created_at', sort_dir ?? 'desc')
  }
}
