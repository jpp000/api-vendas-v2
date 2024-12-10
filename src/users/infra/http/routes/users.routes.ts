import { Router } from 'express'
import { validateCreateUser } from '../middlewares/validate-create-user.middleware'
import { createUserController } from '../controllers/create-user.controller'
import { validateGetUser } from '../middlewares/validate-get-user.middleware'
import { getUserController } from '../controllers/get-user.controller'
import { validateSearchUsers } from '../middlewares/validate-search-users.middleware'
import { searchUsersController } from '../controllers/search-users.controller'
import { loginController } from '../controllers/login.controller'
import { validateLoginUser } from '../middlewares/validate-login.middleware'
import { validaUpdateUser } from '../middlewares/validate-update-user.middleware'
import { updateUserController } from '../controllers/update-user.controller'
import { validaUpdateUserPasswword } from '../middlewares/validate-update-user-password.middleware'
import { updateUserPasswordController } from '../controllers/update-user-password.controller'

const usersRoutes = Router()

usersRoutes.post('/', validateCreateUser, createUserController)

usersRoutes.get('/:id', validateGetUser, getUserController)

usersRoutes.get('/', validateSearchUsers, searchUsersController)

usersRoutes.post('/login', validateLoginUser, loginController)

usersRoutes.put('/:id', validaUpdateUser, updateUserController)

usersRoutes.put(
  '/:id/password',
  validaUpdateUserPasswword,
  updateUserPasswordController,
)

export { usersRoutes }
