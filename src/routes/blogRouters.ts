import {Router} from 'express'
import { BlogControllers } from '../blog/controllers/blogControllers'
import { authMiddleware } from '../auth/middlewares/authMiddlewares'
import { blogValidationMiddlewares,  } from '../blog/middlewares/blogsMiddevares'
import { inputCheckParamsErrorsMiddleware } from '../middlewares/checkParamsReult'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { paramsBlogValidate } from '../blog/middlewares/paramsBlogMiddlewares'
import { postWithBlogValidationMiddlewares } from '../posts/middlewars/postWithBlogIdMiddleware'
import { container } from '../composition-root'


const blogControllers = container.get(BlogControllers)
export const blogsRouter = Router()


blogsRouter.get('/', blogControllers.getAllBySort.bind(blogControllers))
blogsRouter.get('/:id', blogControllers.find.bind(blogControllers))
blogsRouter.get('/:blogId/posts',...paramsBlogValidate,inputCheckParamsErrorsMiddleware,  blogControllers.findPostsByBlogId.bind(blogControllers))
blogsRouter.post('/',authMiddleware,...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.create.bind(blogControllers))
blogsRouter.post('/:blogId/posts',authMiddleware,...postWithBlogValidationMiddlewares, inputCheckErrorsMiddleware,...paramsBlogValidate,inputCheckParamsErrorsMiddleware, blogControllers.createPostInBlog.bind(blogControllers))
blogsRouter.put('/:id',authMiddleware,...blogValidationMiddlewares, inputCheckErrorsMiddleware, blogControllers.update.bind(blogControllers))
blogsRouter.delete('/:id',authMiddleware, blogControllers.delete.bind(blogControllers))