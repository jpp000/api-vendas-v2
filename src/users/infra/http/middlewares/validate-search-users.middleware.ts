import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const searchUserSchema = z.object({
  page: z.number().min(1).default(1),
  per_page: z.number().min(0).default(15),
  sort: z.string().optional().default('created_at'),
  sort_dir: z.string().optional().default('desc'),
  filter: z.string().optional(),
})

export async function validateSearchUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = searchUserSchema.parse(req.body)
    req.body = validatedData

    next()
  } catch (err) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors || err.message,
    })
  }
}
