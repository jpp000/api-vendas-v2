import { UpdateUserPasswordUseCase } from '@/users/application/usecases/update-password.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function updateUserPasswordController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { oldPassword, newPassword } = req.body
    const { id } = req.params

    const updateUserPasswordUseCase =
      container.resolve<UpdateUserPasswordUseCase.UseCase>(
        'UpdateUserPasswordUseCase',
      )

    const updatedUser = await updateUserPasswordUseCase.execute({
      id,
      oldPassword,
      newPassword,
    })

    return res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
}
