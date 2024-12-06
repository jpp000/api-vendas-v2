import { RepositoryInterface } from '@/common/domain/repositories/interfaces/repository.interface'
import { ProductModel } from '../../models/product.model'

export type ProductId = {
  id: string
}

export type CreateProductProps = ProductModel

export interface ProductsRepository
  extends RepositoryInterface<ProductModel, CreateProductProps> {
  findByName(name: string): Promise<ProductModel>
  findAllByIds(ids: ProductId[]): Promise<ProductModel[]>
  conflictingName(name: string): Promise<void>
}
