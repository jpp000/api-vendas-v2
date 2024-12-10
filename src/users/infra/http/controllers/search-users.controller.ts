import { SearchUsersUseCase } from '@/users/application/usecases/search-users.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function searchUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, per_page, sort, sort_dir, filter } = req.body

    const searchUserUseCase =
      container.resolve<SearchUsersUseCase.UseCase>('SearchUsersUseCase')

    const users = await searchUserUseCase.execute({
      page,
      per_page,
      sort,
      sort_dir,
      filter,
    })

    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}
