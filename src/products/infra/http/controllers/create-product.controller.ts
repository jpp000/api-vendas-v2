import { Request, Response } from 'express'
import { ProductsTypeormRepository } from '../../typeorm/repository/products-typeorm.repository'
import { dataSource } from '@/common/infra/typeorm'
import { Product } from '../../typeorm/entities/product.entity'
import { CreateProductUseCase } from '@/products/application/usecases/create-product.usecase'

export async function createProductController(req: Request, res: Response) {
  const { name, price, quantity } = req.body

  const repository = new ProductsTypeormRepository()
  repository.productsRepository = dataSource.getRepository(Product)
  const createProductUseCase = new CreateProductUseCase.UseCase(repository)

  const product = await createProductUseCase.execute({
    name,
    price,
    quantity,
  })

  return res.status(200).json(product)
}
