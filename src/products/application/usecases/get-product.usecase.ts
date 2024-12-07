import { ProductModel } from '@/products/domain/models/product.model'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'
import { inject, injectable } from 'tsyringe'

export namespace GetProductUseCase {
  export type Input = {
    id: string
  }

  export type Output = ProductModel

  @injectable()
  export class UseCase {
    constructor(
      @inject('ProductsRepository')
      private readonly productsRepository: ProductsRepository,
    ) {}

    async execute({ id }: Input): Promise<Output> {
      return this.productsRepository.findById(id)
    }
  }
}
