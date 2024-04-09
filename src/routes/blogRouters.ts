import {Router} from 'express'
import { blogControllers } from '../conttrollers/blogControllers'
import { authMiddleware } from '../middlewares/authMiddlewares'
import { blogValidationMiddlewares,  } from '../middlewares/blogsMiddevares'
import { inputCheckParamsErrorsMiddleware } from '../middlewares/checkParamsReult'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { paramsBlogValidate } from '../middlewares/paramsBlogMiddlewares'
import { postWithBlogValidationMiddlewares } from '../middlewares/postWithBlogIdMiddleware'



export const blogsRouter = Router()


blogsRouter.get('/', blogControllers.getAllBySort)
blogsRouter.get('/:id', blogControllers.find)
blogsRouter.get('/:blogId/posts',...paramsBlogValidate,inputCheckParamsErrorsMiddleware,  blogControllers.findPostsByBlogId)
blogsRouter.post('/',authMiddleware,...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.create)
blogsRouter.post('/:blogId/posts',authMiddleware,...postWithBlogValidationMiddlewares, inputCheckErrorsMiddleware,...paramsBlogValidate,inputCheckParamsErrorsMiddleware, blogControllers.createPostInBlog)
blogsRouter.put('/:id',authMiddleware,...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.update)
blogsRouter.delete('/:id',authMiddleware, blogControllers.delete)