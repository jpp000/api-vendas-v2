import { LoginUseCase } from '@/users/application/usecases/login.usecase'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import {
  AUTHENTICATION_COOKIE,
  AUTHENTICATION_COOKIE_EXPIRATION,
} from '../../constants'

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body

    const loginUseCase = container.resolve<LoginUseCase.UseCase>('LoginUseCase')

    const { user, token } = await loginUseCase.execute({
      email,
      password,
    })

    res.cookie(AUTHENTICATION_COOKIE, token, {
      maxAge: AUTHENTICATION_COOKIE_EXPIRATION,
      httpOnly: true,
    })

    return res.status(200).json({ ...user, token })
  } catch (err) {
    next(err)
  }
}
