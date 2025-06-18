import {Router} from 'express'
import { CommentControllers } from '../comments/controllers/commentControllers'
import { authJWTMiddleware } from '../auth/middlewares/authJWTMiddleware'
import { commentValidatorMiddlewares } from '../comments/middlewars/commentvalidateMiddleware'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { container } from '../composition-root'

const commentControllers = container.get( CommentControllers)
export const commentRouter = Router()


commentRouter.put('/:commentId',authJWTMiddleware, commentValidatorMiddlewares, inputCheckErrorsMiddleware, commentControllers.updateCommentById)
commentRouter.delete('/:commentId',authJWTMiddleware,  commentControllers.deleteCommentById)
commentRouter.get('/:id',  commentControllers.getCommentById)





 