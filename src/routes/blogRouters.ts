import {Router} from 'express'
import { blogControllers } from '../conttrollers/blogControllers'
import { authMiddleware } from '../middlewares/authMiddlewares'
import { blogValidationMiddlewares,  } from '../middlewares/blogsMiddevares'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { BlogValidatorRules } from '../input-uotput-types/blog-types'
import {body} from 'express-validator'

export const blogsRouter = Router()

/*export const blogWebUrlLengthValidation = body('websiteUrl')
    .isString()
    .withMessage('Should be a string')
    .trim()
    .isLength({ min: 1, max: BlogValidatorRules.websiteUrlMaxLength })
    .withMessage(`Content should be 1-${BlogValidatorRules.websiteUrlMaxLength} characters long`)
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/, 'i')
    .withMessage('Invalid website URL');*/

blogsRouter.get('/', blogControllers.getAll)
blogsRouter.get('/:id', blogControllers.find)
blogsRouter.post('/',inputCheckErrorsMiddleware, blogControllers.create)
blogsRouter.put('/:id', blogControllers.update)
blogsRouter.delete('/:id', blogControllers.delete)