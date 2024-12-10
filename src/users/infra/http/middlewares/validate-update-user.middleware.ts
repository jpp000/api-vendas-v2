import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const updateUserParamsSchema = z.object({
  id: z.string().optional(),
})

const updateUserBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
})

export function validaUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedBody = updateUserBodySchema.parse(req.body)
    const validatedParams = updateUserParamsSchema.parse(req.params)

    req.body = validatedBody
    req.params = validatedParams

    next()
  } catch (err) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
