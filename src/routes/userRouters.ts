import {Router} from 'express'
import { usersControllers } from '../conttrollers/usersControllers'
import { authMiddleware } from '../middlewares/authMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { userValidationMiddlevare } from '../middlewares/usersMiddleware'



export const usersRouter = Router()


usersRouter.get('/',authMiddleware, usersControllers.getAllUsers)
usersRouter.post('/',authMiddleware,...userValidationMiddlevare,inputCheckErrorsMiddleware, usersControllers.createUser)
usersRouter.delete('/:id',authMiddleware, usersControllers.deleteUser)