import { AppError } from '@/common/domain/errors/app.error'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  API_URL: z.string().default('http://localhost:3000'),
  DB_TYPE: z.enum(['postgres', 'mysql', 'sqlite', 'mssql']).default('postgres'),
  DB_USER: z.string().default('postgres'),
  DB_PASS: z.string().default('docker'),
  DB_HOST: z.string().default('localhost'),
  DB_NAME: z.string().default('apivendas'),
  DB_PORT: z.coerce.number().default(5432),
  DB_SCHEMA: z.string().default('public'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new AppError('Invalid environment variables')
}

export const env = _env.data
