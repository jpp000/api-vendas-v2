import { AppError } from '@/common/domain/errors/app.error'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development'),
	PORT: z.coerce.number().default(3000),
	API_URL: z.string().default('http://localhost:3000'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	throw new AppError('Invalid environment variables')
}

export const env = _env.data
