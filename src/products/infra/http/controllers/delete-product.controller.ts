import { DeleteProductUseCase } from '@/products/application/usecases/delete-product.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export async function deleteProductController(req: Request, res: Response) {
  const { id } = req.params

  const deleteProductUseCase = container.resolve<DeleteProductUseCase.UseCase>(
    'DeleteProductUseCase',
  )

  await deleteProductUseCase.execute({ id })

  return res.status(200).json(true)
}
