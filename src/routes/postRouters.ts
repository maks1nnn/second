import {Router} from 'express'
import { postControllers } from '../conttrollers/postControllaers'
import { postValidationMiddlewares } from '../middlewares/postsMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { authMiddleware } from '../middlewares/authMiddlewares'

export const postsRouter = Router()

postsRouter.get('/', postControllers.getAll)
postsRouter.get('/:id', postControllers.find)
postsRouter.post('/',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.create)
postsRouter.put('/:id',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.update)
postsRouter.delete('/:id',authMiddleware, postControllers.delete)