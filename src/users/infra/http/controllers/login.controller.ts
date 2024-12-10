import { LoginUseCase } from '@/users/application/usecases/login.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body

    const loginUseCase = container.resolve<LoginUseCase.UseCase>('LoginUseCase')

    const loginRes = await loginUseCase.execute(
      {
        email,
        password,
      },
      res,
    )

    return res.status(200).json(loginRes)
  } catch (err) {
    next(err)
  }
}
