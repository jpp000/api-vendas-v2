import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const getProductSchema = z.object({
  id: z.string().uuid(),
})

export function validateGetProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = getProductSchema.parse(req.params)
    req.params = validatedData

    next()
  } catch (err) {
    res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
