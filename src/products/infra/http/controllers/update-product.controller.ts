import { UpdateProductUseCase } from '@/products/application/usecases/update-product.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export async function updateProductController(req: Request, res: Response) {
  const updateProductUseCase = container.resolve<UpdateProductUseCase.UseCase>(
    'UpdateProductUseCase',
  )

  const productUpdated = await updateProductUseCase.execute({
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  })

  return res.status(200).json(productUpdated)
}
