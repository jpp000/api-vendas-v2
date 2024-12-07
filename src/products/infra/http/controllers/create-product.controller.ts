import { AppError } from '@/common/domain/errors/app.error'
import { z } from 'zod'
import { ProductsTypeormRepository } from '../../typeorm/repository/products-typeorm.repository'
import { dataSource } from '@/common/infra/typeorm'
import { Product } from '../../typeorm/entities/product.entity'
import { CreateProductUseCase } from '@/products/application/usecases/create-product.usecase'
import { Request, Response } from 'express'

export async function handler(req: Request, res: Response) {
  const createProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
  })

  const validatedData = createProductSchema.safeParse(req.body)

  if (!validatedData.success) {
    console.error('Invalid data', validatedData.error.format())
    throw new AppError(
      `${validatedData.error.errors.map(err => {
        return `${err.path} -> ${err.message}`
      })}`,
    )
  }

  const { name, price, quantity } = validatedData.data

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
