import { BadRequestError } from '@/common/domain/errors/bad-request.error'
import { ProductModel } from '@/products/domain/models/product.model'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'

export namespace CreateProductUseCase {
  export type Input = {
    name: string
    price: number
    quantity: number
  }

  export type Output = ProductModel

  export class UseCase {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async execute(input: Input): Promise<Output> {
      const { name, price, quantity } = input

      if (!name || price <= 0 || quantity <= 0) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      await this.productsRepository.conflictingName(name)

      const product = this.productsRepository.create(input)
      return this.productsRepository.insert(product)
    }
  }
}
