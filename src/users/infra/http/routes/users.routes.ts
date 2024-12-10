import { Router } from 'express'
import { validateCreateUser } from '../middlewares/validate-create-user.middleware'
import { createUserController } from '../controllers/create-user.controller'
import { validateGetUser } from '../middlewares/validate-get-user.middleware'
import { getUserController } from '../controllers/get-user.controller'
import { validateSearchUsers } from '../middlewares/validate-search-users.middleware'
import { searchUsersController } from '../controllers/search-users.controller'
import { loginController } from '../controllers/login.controller'
import { validateLoginUser } from '../middlewares/validate-login.middleware'

const usersRoutes = Router()

usersRoutes.post('/', validateCreateUser, createUserController)

usersRoutes.get('/:id', validateGetUser, getUserController)

usersRoutes.get('/', validateSearchUsers, searchUsersController)

usersRoutes.post('/login', validateLoginUser, loginController)

export { usersRoutes }
