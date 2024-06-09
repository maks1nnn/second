import {Router} from 'express'
import { commentControllers } from '../conttrollers/commentControllers'


export const commentRouter = Router()


commentRouter.put('/:commentId', commentControllers.updateCommentById)
commentRouter.delete('/:commentId', commentControllers.deleteCommentById)
commentRouter.get('/:id', commentControllers.getCommentById)






    