import { DeleteProductUseCase } from '@/products/application/usecases/delete-product.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function deleteProductController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params

    const deleteProductUseCase =
      container.resolve<DeleteProductUseCase.UseCase>('DeleteProductUseCase')

    await deleteProductUseCase.execute({ id })

    return res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
