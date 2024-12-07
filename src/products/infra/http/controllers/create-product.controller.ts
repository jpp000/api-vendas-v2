import { Request, Response } from 'express'
import { CreateProductUseCase } from '@/products/application/usecases/create-product.usecase'
import { container } from 'tsyringe'

export async function createProductController(req: Request, res: Response) {
  const { name, price, quantity } = req.body

  const createProductUseCase = container.resolve<CreateProductUseCase.UseCase>(
    'CreateProductUseCase',
  )

  const product = await createProductUseCase.execute({
    name,
    price,
    quantity,
  })

  return res.status(200).json(product)
}
