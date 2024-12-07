import { GetProductUseCase } from '@/products/application/usecases/get-product.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export async function getProductController(req: Request, res: Response) {
  const { id } = req.params

  const getProductUseCase =
    container.resolve<GetProductUseCase.UseCase>('GetProductUseCase')

  const product = await getProductUseCase.execute({ id })

  return res.status(200).json(product)
}
