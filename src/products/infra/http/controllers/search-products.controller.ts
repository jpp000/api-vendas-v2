import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { SearchProductsUseCase } from '@/products/application/usecases/search-products.usecase'

export async function searchProductsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, per_page, sort, sort_dir, filter } = req.body

    const searchProductsUseCase =
      container.resolve<SearchProductsUseCase.UseCase>('SearchProductsUseCase')

    const search = await searchProductsUseCase.execute({
      page,
      per_page,
      sort,
      sort_dir,
      filter,
    })

    return res.status(200).json(search)
  } catch (err) {
    next(err)
  }
}
