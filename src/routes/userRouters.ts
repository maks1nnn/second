
import { Router } from 'express'
import { container } from '../composition-root'
import { authMiddleware } from '../auth/middlewares/authMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { userValidationMiddlevare } from '../users/middlewars/usersMiddleware'
import { UsersControllers } from '../users/controllers/usersControllers'


const usersControllers = container.get(UsersControllers)

export const usersRouter = Router()


usersRouter.get('/', authMiddleware, usersControllers.getAllUsers.bind(usersControllers))
usersRouter.post('/', authMiddleware, ...userValidationMiddlevare, inputCheckErrorsMiddleware, usersControllers.createUser.bind(usersControllers))
usersRouter.delete('/:id', authMiddleware, usersControllers.deleteUser.bind(usersControllers))