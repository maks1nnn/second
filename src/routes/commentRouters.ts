import {Router} from 'express'
import { commentControllers } from '../conttrollers/commentControllers'
import { authJWTMiddleware } from '../middlewares/authJWTMiddleware'
import { commentValidatorMiddlewares } from '../middlewares/commentvalidateMiddleware'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'


export const commentRouter = Router()


commentRouter.put('/:commentId',authJWTMiddleware, commentValidatorMiddlewares, inputCheckErrorsMiddleware, commentControllers.updateCommentById)
commentRouter.delete('/:commentId',authJWTMiddleware,  commentControllers.deleteCommentById)
commentRouter.get('/:id',  commentControllers.getCommentById)





 