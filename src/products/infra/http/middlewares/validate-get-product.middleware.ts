import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { dataValidation } from '@/common/infra/validation/zod'

const getProductSchema = z.object({
  id: z.string().uuid(),
})

export function validateGetProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  dataValidation(getProductSchema, req.params)
  next()
}
