import { AppError } from '@/common/domain/errors/app.error'

export function dataValidation(schema: any, data: any) {
  const validatedData = schema.safeParse(data)

  if (!validatedData.success) {
    console.error('Invalid data', validatedData.error.format())
    throw new AppError(
      validatedData.error.errors
        .map(err => `${err.path.join('.')} -> ${err.message}`)
        .join('; '),
    )
  }

  return validatedData.data
}
