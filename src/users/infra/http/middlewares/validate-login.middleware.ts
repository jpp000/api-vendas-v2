import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const loginUserSchema = z.object({
  email: z.string().email('Email must be a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export async function validateLoginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = loginUserSchema.parse(req.body)
    req.body = validatedData

    next()
  } catch (err) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
