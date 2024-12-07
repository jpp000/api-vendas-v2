import { BadRequestError } from '@/common/domain/errors/bad-request.error'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'
import { inject, injectable } from 'tsyringe'
import { ProductOutput } from '../dtos/product-output.dto'

export namespace CreateProductUseCase {
  export type Input = {
    name: string
    price: number
    quantity: number
  }

  export type Output = ProductOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('ProductsRepository')
      private readonly productsRepository: ProductsRepository,
    ) {}

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
