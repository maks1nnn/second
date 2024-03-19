import {body} from "express-validator"
import {PostValidatorRules} from '../input-uotput-types/post-types'
import {blogRepository} from '../repositories/blogs-repositories'

export const postValidationMiddlewares =[
     body('title')
    .isString()
    .withMessage("Title should be a string")
    .trim()
    .isLength({min:1, max: PostValidatorRules.titleMaxLength})
    .withMessage(`Title should be 1-${PostValidatorRules.titleMaxLength} characters long` ),

 body('shortDescription')
    .isString()
    .withMessage('Should be a string')
    .trim()
    .isLength({min:1,max: PostValidatorRules.shortDescriptionMaxLength})
    .withMessage(`Short description should be 1-${PostValidatorRules.shortDescriptionMaxLength} characters long`),

 body('content')
    .isString()
    .withMessage('Should be a string')
    .trim()
    .isLength({min:1,max: PostValidatorRules.contentMaxLength})
    .withMessage(`Content should be 1-${PostValidatorRules.contentMaxLength} characters long`),

     body('blogId')
        .isString()
        .withMessage('Blog should be string')
        .trim()
        .isLength({min:1})
        .withMessage('Blog Id is required')
        .custom((blogId) => {
            const isBlogIdExists = blogRepository.findBlogs(blogId)
            return !!isBlogIdExists;
        })
        .withMessage("there is no blog with such id"),
    ]