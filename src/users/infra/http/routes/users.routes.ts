import { Router } from 'express'
import { validateCreateUser } from '../middlewares/validate-create-user.middleware'
import { createUserController } from '../controllers/create-user.controller'

const usersRoutes = Router()

usersRoutes.post('/', validateCreateUser, createUserController)

export { usersRoutes }
