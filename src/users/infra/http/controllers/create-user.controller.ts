import { CreateUserUseCase } from '@/users/application/usecases/create-user.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = req.body

    const createUserUseCase =
      container.resolve<CreateUserUseCase.UseCase>('CreateUserUseCase')

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    })

    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
