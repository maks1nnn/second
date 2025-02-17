import {Router} from 'express'
import { usersControllers } from '../users/controllers/usersControllers'
import { authMiddleware } from '../auth/middlewares/authMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { userValidationMiddlevare } from '../users/middlewars/usersMiddleware'



export const usersRouter = Router()


usersRouter.get('/',authMiddleware, usersControllers.getAllUsers)
usersRouter.post('/',authMiddleware,...userValidationMiddlevare,inputCheckErrorsMiddleware, usersControllers.createUser)
usersRouter.delete('/:id',authMiddleware, usersControllers.deleteUser)