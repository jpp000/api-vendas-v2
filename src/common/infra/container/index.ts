import '@/products/infra/container'
import '@/users/infra/container'
import { container } from 'tsyringe'
import { AuthMiddleware } from '../http/middlewares/auth.middleware'

container.registerSingleton<AuthMiddleware>('AuthMiddleware', AuthMiddleware)
