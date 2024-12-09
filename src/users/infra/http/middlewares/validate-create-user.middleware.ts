import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(3, 'Name must have at least 3 char'),
  email: z.string().email('Email must be a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export async function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = createUserSchema.parse(req.body)
    req.body = validatedData

    next()
  } catch (err) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
