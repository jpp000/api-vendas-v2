import { RepositoryInterface } from '@/common/domain/repositories/interfaces/repository.interface'
import { ProductModel } from '../../models/product.model'

export type ProductId = {
  id: string
}

export type CreateProductProps = {
  id?: string
  name: string
  price: number
  quantity: number
  created_at?: Date
  updated_at?: Date
}

export interface ProductsRepository
  extends RepositoryInterface<ProductModel, CreateProductProps> {
  findByName(name: string): Promise<ProductModel>
  findAllByIds(ids: ProductId[]): Promise<ProductModel[]>
  conflictingName(productName: string, productId: string): Promise<void>
}
