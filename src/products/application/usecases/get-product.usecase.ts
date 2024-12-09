import { ProductsRepository } from '@/products/domain/repositories/products.repository'
import { inject, injectable } from 'tsyringe'
import { ProductOutput } from '../dtos/product-output.dto'

export namespace GetProductUseCase {
  export type Input = {
    id: string
  }

  export type Output = ProductOutput

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
