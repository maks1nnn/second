import {Router} from 'express'
import { postControllers } from '../conttrollers/postControllaers'
import { postValidationMiddlewares } from '../middlewares/postsMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'

export const postsRouter = Router()

postsRouter.get('/', postControllers.getAll)
postsRouter.get('/:id', postControllers.find)
postsRouter.post('/',...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.create)
postsRouter.put('/:id',...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.update)
postsRouter.delete('/:id', postControllers.delete)