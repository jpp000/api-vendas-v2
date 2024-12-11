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

const usersRoutes = Router()

usersRoutes.post('/', validateCreateUser, signupController)

usersRoutes.get('/:id', validateGetUser, getUserController)

usersRoutes.get('/', validateSearchUsers, searchUsersController)

usersRoutes.post('/login', validateLoginUser, loginController)

usersRoutes.put('/:id', validaUpdateUser, updateUserController)

usersRoutes.put(
  '/:id/password',
  validaUpdateUserPasswword,
  updateUserPasswordController,
)

usersRoutes.delete('/:id', validateGetUser, deleteUserController)

export { usersRoutes }
