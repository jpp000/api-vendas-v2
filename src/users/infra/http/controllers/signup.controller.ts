import { SignupUseCase } from '@/users/application/usecases/signup.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = req.body

    const SignupUseCase =
      container.resolve<SignupUseCase.UseCase>('SignupUseCase')

    const user = await SignupUseCase.execute({
      name,
      email,
      password,
    })

    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
