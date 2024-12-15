import { Router } from 'express'
import {
  validateCreateUser,
  validateGetUser,
  validaUpdateUser,
  validaUpdateUserPasswword,
  validateLoginUser,
  validateSearchUsers,
} from '../middlewares'
import {
  signupController,
  getUserController,
  searchUsersController,
  loginController,
  updateUserController,
  updateUserPasswordController,
  deleteUserController,
} from '../controllers'
import { container } from 'tsyringe'
import { AuthMiddleware } from '@/common/infra/http/middlewares/auth.middleware'
import { currentUserController } from '../controllers/current-user.controller'

const usersRoutes = Router()

const authMiddleware = container.resolve<AuthMiddleware>('AuthMiddleware')

usersRoutes.post('/', validateCreateUser, signupController)

usersRoutes.post('/login', validateLoginUser, loginController)

usersRoutes.use(authMiddleware.execute.bind(authMiddleware))

usersRoutes.get('/current', currentUserController)

usersRoutes.get('/:id', validateGetUser, getUserController)

usersRoutes.get('/', validateSearchUsers, searchUsersController)

usersRoutes.put('/:id', validaUpdateUser, updateUserController)

usersRoutes.put(
  '/:id/password',
  validaUpdateUserPasswword,
  updateUserPasswordController,
)

usersRoutes.delete('/:id', validateGetUser, deleteUserController)

export { usersRoutes }
