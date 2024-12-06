import { AppError } from '@/common/domain/errors/app.error'
import { NextFunction, Request, Response } from 'express'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      name: err.name,
    })
  }

  return res.status(500).json({
    message: 'internal server error',
  })
}
