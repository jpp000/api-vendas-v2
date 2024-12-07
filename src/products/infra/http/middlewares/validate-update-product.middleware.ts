import { dataValidation } from '@/common/infra/validation/zod'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const updateProductBodySchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
})

const updateProductParamsSchema = z.object({
  id: z.string().uuid(),
})

export function validateUpdateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  dataValidation(updateProductBodySchema, req.body)
  dataValidation(updateProductParamsSchema, req.params)

  next()
}
