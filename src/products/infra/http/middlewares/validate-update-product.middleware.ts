import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const updateProductBodySchema = z.object({
  name: z.string().optional(),
  price: z.coerce.number().optional(),
  quantity: z.coerce.number().optional(),
})

const updateProductParamsSchema = z.object({
  id: z.string().uuid(),
})

export function validateUpdateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedParamsData = updateProductParamsSchema.parse(req.params)
    req.params = validatedParamsData

    const validatedBodyData = updateProductBodySchema.parse(req.body)
    req.body = validatedBodyData

    next()
  } catch (err) {
    res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
