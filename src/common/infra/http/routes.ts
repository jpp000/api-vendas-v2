import { productRoutes } from '@/products/infra/http/routes/products.routes'
import { Router } from 'express'

const routes = Router()

routes.get('/health', (req, res) => res.status(200).send(true))
routes.use('/products', productRoutes)

export { routes }
