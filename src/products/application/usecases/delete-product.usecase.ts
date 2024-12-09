import { ProductsRepository } from '@/products/domain/repositories/products.repository'
import { inject, injectable } from 'tsyringe'

export namespace DeleteProductUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  @injectable()
  export class UseCase {
    constructor(
      @inject('ProductsRepository')
      private readonly productsRepository: ProductsRepository,
    ) {}

    async execute({ id }: Input): Promise<Output> {
      await this.productsRepository.delete(id)
    }
  }
}
