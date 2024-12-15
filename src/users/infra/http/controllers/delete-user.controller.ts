import { UnauthorizedError } from '@/common/domain/errors/unauthorized.error'
import { DeleteUserUseCase } from '@/users/application/usecases/delete-user.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { AUTHENTICATION_COOKIE } from '../../constants'

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params

    const deleteUserUseCase =
      container.resolve<DeleteUserUseCase.UseCase>('DeleteUserUseCase')

    if (req.user?.invalid) {
      throw new UnauthorizedError(
        'Your session has expired or your account is invalid. Please log in again.',
      )
    }

    req.user.invalid = true

    await deleteUserUseCase.execute({ id }, req)

    res.clearCookie(AUTHENTICATION_COOKIE)

    return res.status(200).json(true)
  } catch (err) {
    next(err)
  }
}
