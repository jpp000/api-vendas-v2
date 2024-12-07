import { Router } from 'express'
import { createProductController } from '../controllers/create-product.controller'
import { validateCreateProduct } from '../middlewares/validate-create-product.middleware'

const productRoutes = Router()

productRoutes.post('/', validateCreateProduct, createProductController)

export { productRoutes }
