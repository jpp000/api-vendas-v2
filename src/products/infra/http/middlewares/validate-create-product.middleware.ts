import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { dataValidation } from '@/common/infra/validation/zod'

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
  dataValidation(createProductSchema, req.body)
  next()
}
