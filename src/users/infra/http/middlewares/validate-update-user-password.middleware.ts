import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const updateUserPasswordParamsSchema = z.object({
  id: z.string().optional(),
})

const updateUserPasswordBodySchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

export function validaUpdateUserPasswword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedBody = updateUserPasswordBodySchema.parse(req.body)
    const validatedParams = updateUserPasswordParamsSchema.parse(req.params)

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
