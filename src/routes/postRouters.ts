import {Router} from 'express'
import { PostControllers } from '../posts/controllers/postControllaers'
import { postValidationMiddlewares } from '../posts/middlewars/postsMiddlewares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { authMiddleware } from '../auth/middlewares/authMiddlewares'
import { authJWTMiddleware } from '../auth/middlewares/authJWTMiddleware'
import { commentValidatorMiddlewares } from '../comments/middlewars/commentvalidateMiddleware'
import { container } from '../composition-root'

const postControllers = container.get(PostControllers)
export const postsRouter = Router()

postsRouter.get('/', postControllers.getAllBySort.bind(postControllers))
postsRouter.get('/:id', postControllers.find.bind(postControllers))
postsRouter.post('/',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.create.bind(postControllers))
postsRouter.put('/:id',authMiddleware, ...postValidationMiddlewares, inputCheckErrorsMiddleware , postControllers.update.bind(postControllers))
postsRouter.delete('/:id',authMiddleware, postControllers.delete.bind(postControllers))
postsRouter.post('/:postId/comments',authJWTMiddleware,commentValidatorMiddlewares, inputCheckErrorsMiddleware, postControllers.createPostComment.bind(postControllers))
postsRouter.get('/:postId/comments', postControllers.getAllPostComments.bind(postControllers))