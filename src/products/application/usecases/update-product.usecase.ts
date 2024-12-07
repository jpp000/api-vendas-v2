import { inject, injectable } from 'tsyringe'
import { ProductOutput } from '../dtos/product-output.dto'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'

export namespace UpdateProductUseCase {
  export type Input = {
    id: string
    name?: string
    price?: number
    quantity?: number
  }

  export type Output = ProductOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('ProductsRepository')
      private readonly productsRepository: ProductsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const product = await this.productsRepository.findById(input.id)

      Object.keys(input).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          product[key] = input[key]
        }
      })

      const updatedProduct = await this.productsRepository.update(product)

      return updatedProduct
    }
  }
}
