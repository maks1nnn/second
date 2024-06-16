import {Router} from 'express'
import { postControllers } from '../conttrollers/postControllaers'
import { postValidationMiddlewares } from '../middlewares/postsMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { authMiddleware } from '../middlewares/authMiddlewares'
import { authJWTMiddleware } from '../middlewares/authJWTMiddleware'

export const postsRouter = Router()

postsRouter.get('/', postControllers.getAllBySort)
postsRouter.get('/:id', postControllers.find)
postsRouter.post('/',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.create)
postsRouter.put('/:id',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.update)
postsRouter.delete('/:id',authMiddleware, postControllers.delete)
postsRouter.post('/:postId/comments',authJWTMiddleware, postControllers.createPostComment)
postsRouter.get('/:postId/comments', postControllers.getAllPostComments)