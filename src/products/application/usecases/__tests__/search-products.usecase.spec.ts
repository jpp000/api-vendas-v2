import 'reflect-metadata'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'
import { ProductsInMemoryRepository } from '@/products/infra/in-memory/repositories/products-in-memory.repository'
import { SearchProductsUseCase } from '../search-products.usecase'

describe('SearchProductsUseCase Unit Tests', () => {
  let sut: SearchProductsUseCase.UseCase
  let repository: ProductsRepository

  beforeEach(() => {
    repository = new ProductsInMemoryRepository()
    sut = new SearchProductsUseCase.UseCase(repository)
  })

  it('should return paginated products with default parameters', async () => {
    const products = Array.from({ length: 20 }).map((_, index) =>
      repository.create({
        name: `Product ${index + 1}`,
        price: 10,
        quantity: 5,
      }),
    )
    for (const product of products) {
      await repository.insert(product)
    }

    const result = await sut.execute({})
    expect(result.items).toHaveLength(15)
    expect(result.total).toBe(20)
    expect(result.current_page).toBe(1)
  })

  it('should apply sorting and filtering', async () => {
    await repository.insert(
      repository.create({ name: 'A Product', price: 10, quantity: 5 }),
    )
    await repository.insert(
      repository.create({ name: 'B Product', price: 20, quantity: 3 }),
    )

    const result = await sut.execute({
      filter: 'A',
      sort: 'price',
      sort_dir: 'asc',
      page: 1,
      per_page: 1,
    })

    expect(result.items).toHaveLength(1)
    expect(result.items[0].name).toBe('A Product')
    expect(result.sort).toBe('price')
    expect(result.sort_dir).toBe('asc')
  })

  it('should handle invalid sort and sort_dir gracefully', async () => {
    await repository.insert(
      repository.create({ name: 'Product 1', price: 10, quantity: 5 }),
    )

    const result = await sut.execute({
      sort: 'invalid_field',
      sort_dir: 'invalid_dir',
    })

    expect(result.sort).toBe('created_at')
    expect(result.sort_dir).toBe('desc')
  })

  it('should handle pagination correctly', async () => {
    const products = Array.from({ length: 15 }).map((_, index) =>
      repository.create({
        name: `Product ${index + 1}`,
        price: 10,
        quantity: 5,
      }),
    )
    for (const product of products) {
      await repository.insert(product)
    }

    const result = await sut.execute({ page: 2, per_page: 5 })
    expect(result.items).toHaveLength(5)
    expect(result.current_page).toBe(2)
    expect(result.total).toBe(15)
  })
})
