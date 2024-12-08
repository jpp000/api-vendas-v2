import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const searchProductsSchema = z.object({
  page: z.number().min(1).default(1),
  per_page: z.number().default(15),
  sort: z.string().optional().default('created_at'),
  sort_dir: z.string().optional().default('desc'),
  filter: z.string().optional(),
})

export function validateSearchProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = searchProductsSchema.parse(req.body)
    req.body = validatedData

    next()
  } catch (err) {
    res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
