import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { AppError } from '@/common/domain/errors/app.error'

const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  quantity: z.number().min(0, 'Quantity must be greater than or equal to 0'),
})

export function validateCreateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validatedData = createProductSchema.safeParse(req.body)

  if (!validatedData.success) {
    console.error('Invalid data', validatedData.error.format())
    throw new AppError(
      validatedData.error.errors
        .map(err => `${err.path.join('.')} -> ${err.message}`)
        .join('; '),
    )
  }

  req.body = validatedData.data
  next()
}
