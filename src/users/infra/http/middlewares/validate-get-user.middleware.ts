import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const getUserSchema = z.object({
  id: z.string().uuid(),
})

export async function validateGetUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = getUserSchema.parse(req.params)
    req.params = validatedData

    next()
  } catch (err) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
