import {Router} from 'express'
import { blogControllers } from '../blog/controllers/blogControllers'
import { authMiddleware } from '../auth/middlewares/authMiddlewares'
import { blogValidationMiddlewares,  } from '../blog/middlewares/blogsMiddevares'
import { inputCheckParamsErrorsMiddleware } from '../middlewares/checkParamsReult'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { paramsBlogValidate } from '../blog/middlewares/paramsBlogMiddlewares'
import { postWithBlogValidationMiddlewares } from '../posts/middlewars/postWithBlogIdMiddleware'



export const blogsRouter = Router()


blogsRouter.get('/', blogControllers.getAllBySort)
blogsRouter.get('/:id', blogControllers.find)
blogsRouter.get('/:blogId/posts',...paramsBlogValidate,inputCheckParamsErrorsMiddleware,  blogControllers.findPostsByBlogId)
blogsRouter.post('/',authMiddleware,...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.create)
blogsRouter.post('/:blogId/posts',authMiddleware,...postWithBlogValidationMiddlewares, inputCheckErrorsMiddleware,...paramsBlogValidate,inputCheckParamsErrorsMiddleware, blogControllers.createPostInBlog)
blogsRouter.put('/:id',authMiddleware,...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.update)
blogsRouter.delete('/:id',authMiddleware, blogControllers.delete)