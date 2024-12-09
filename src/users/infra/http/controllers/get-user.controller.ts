import { GetUserUseCase } from '@/users/application/usecases/get-user.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params

    const getUserUseCase =
      container.resolve<GetUserUseCase.UseCase>('GetUserUseCase')

    const user = await getUserUseCase.execute({ id })

    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
