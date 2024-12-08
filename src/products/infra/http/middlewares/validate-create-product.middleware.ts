import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  quantity: z.number().min(1, 'Quantity must be greater than 0'),
})

export function validateCreateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = createProductSchema.parse(req.body)
    req.body = validatedData

    next()
  } catch (err) {
    res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
