import {Router} from 'express'
import { commentControllers } from '../comments/controllers/commentControllers'
import { authJWTMiddleware } from '../auth/middlewares/authJWTMiddleware'
import { commentValidatorMiddlewares } from '../comments/middlewars/commentvalidateMiddleware'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'


export const commentRouter = Router()


commentRouter.put('/:commentId',authJWTMiddleware, commentValidatorMiddlewares, inputCheckErrorsMiddleware, commentControllers.updateCommentById)
commentRouter.delete('/:commentId',authJWTMiddleware,  commentControllers.deleteCommentById)
commentRouter.get('/:id',  commentControllers.getCommentById)





 