import {Router} from 'express'
import { postControllers } from '../posts/controllers/postControllaers'
import { postValidationMiddlewares } from '../posts/middlewars/postsMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { authMiddleware } from '../auth/middlewares/authMiddlewares'
import { authJWTMiddleware } from '../auth/middlewares/authJWTMiddleware'
import { commentValidatorMiddlewares } from '../comments/middlewars/commentvalidateMiddleware'

export const postsRouter = Router()

postsRouter.get('/', postControllers.getAllBySort)
postsRouter.get('/:id', postControllers.find)
postsRouter.post('/',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.create)
postsRouter.put('/:id',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.update)
postsRouter.delete('/:id',authMiddleware, postControllers.delete)
postsRouter.post('/:postId/comments',authJWTMiddleware,commentValidatorMiddlewares, inputCheckErrorsMiddleware, postControllers.createPostComment)
postsRouter.get('/:postId/comments', postControllers.getAllPostComments)