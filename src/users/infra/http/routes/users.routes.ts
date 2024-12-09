import { Router } from 'express'
import { validateCreateUser } from '../middlewares/validate-create-user.middleware'
import { createUserController } from '../controllers/create-user.controller'
import { validateGetUser } from '../middlewares/validate-get-user.middleware'
import { getUserController } from '../controllers/get-user.controller'

const usersRoutes = Router()

usersRoutes.post('/', validateCreateUser, createUserController)

usersRoutes.get('/:id', validateGetUser, getUserController)

export { usersRoutes }
