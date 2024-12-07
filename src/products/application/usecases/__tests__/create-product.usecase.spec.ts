import { ProductsInMemoryRepository } from '@/products/infra/in-memory/repositories/products-in-memory.repository'
import { CreateProductUseCase } from '../create-product.usecase'
import { ConflictError } from '@/common/domain/errors/conflict.error'
import { BadRequestError } from '@/common/domain/errors/bad-request.error'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'

describe('CreateProductUseCase Unit Tests', () => {
  let sut: CreateProductUseCase.UseCase
  let repository: ProductsRepository

  beforeEach(() => {
    repository = new ProductsInMemoryRepository()
    sut = new CreateProductUseCase.UseCase(repository)
  })

  it('should create a product', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = {
      name: 'Product 1',
      price: 10,
      quantity: 5,
    }
    const result = await sut.execute(props)
    expect(result.id).toBeDefined()
    expect(result.created_at).toBeDefined()
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('should not be possible to register a product with the name of another product', async () => {
    const props = {
      name: 'Product 1',
      price: 10,
      quantity: 5,
    }
    await sut.execute(props)
    await expect(sut.execute(props)).rejects.toBeInstanceOf(ConflictError)
  })

  it('should throws error when name not provided', async () => {
    const props = {
      name: null,
      price: 10,
      quantity: 5,
    }
    await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should throws error when price not provided', async () => {
    const props = {
      name: 'Product 1',
      price: 0,
      quantity: 5,
    }
    await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should throws error when quantity not provided', async () => {
    const props = {
      name: 'Product 1',
      price: 10,
      quantity: 0,
    }
    await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })
})
