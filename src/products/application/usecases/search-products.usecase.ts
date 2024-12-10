import { inject, injectable } from 'tsyringe'
import { ProductOutput } from '../dtos/product-output.dto'
import { ProductsRepository } from '@/products/domain/repositories/products.repository'
import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/interfaces/repository.interface'

export namespace SearchProductsUseCase {
  export type Input = SearchInput

  export type Output = SearchOutput<ProductOutput>

  @injectable()
  export class UseCase {
    constructor(
      @inject('ProductsRepository')
      private readonly productsRepository: ProductsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      return this.productsRepository.search(input)
    }
  }
}
