import {Router} from 'express'
import { blogControllers } from '../conttrollers/blogControllers'
import { authMiddleware } from '../middlewares/authMiddlewares'
import { blogValidationMiddlewares,  } from '../middlewares/blogsMiddevares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'



export const blogsRouter = Router()


blogsRouter.get('/', blogControllers.getAll)
blogsRouter.get('/:id', blogControllers.find)
blogsRouter.post('/',...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.create)
blogsRouter.put('/:id',...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.update)
blogsRouter.delete('/:id', blogControllers.delete)