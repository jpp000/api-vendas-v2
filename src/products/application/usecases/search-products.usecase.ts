import { inject, injectable } from 'tsyringe'
import { ProductOutput } from '../dtos/product-output.dto'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'

export namespace SearchProductsUseCase {
  export type Input = {
    page?: number
    per_page?: number
    sort?: string | null
    sort_dir?: string | null
    filter?: string | null
  }

  export type Output = {
    items: ProductOutput[]
    per_page: number
    total: number
    current_page: number
    sort: string | null
    sort_dir: string | null
    filter: string | null
  }

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
