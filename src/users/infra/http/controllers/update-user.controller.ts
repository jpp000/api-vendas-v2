import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email } = req.body
    const { id } = req.params

    const updateUserUseCase =
      container.resolve<UpdateUserUseCase.UseCase>('UpdateUserUseCase')

    const updatedUser = await updateUserUseCase.execute({
      id,
      name,
      email,
    })

    return res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
}
