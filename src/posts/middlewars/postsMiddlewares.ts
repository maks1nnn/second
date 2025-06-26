import {body} from "express-validator"
import { ObjectId } from "mongodb"
import {PostValidatorRules} from '../types/post-types'
import {BlogRepository} from '../../blog/repository/blogMongo-repositories'

const blogRepository = new BlogRepository()

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
        .isLength({min:12, max :24})
        .withMessage('Blog Id is required')
        .custom(async (blogId) => {
         const blog = await  blogRepository.findBlogs(new ObjectId(blogId));
         if (!blog) {
             return Promise.reject('There is no blog with such id');
         }
         return true;
     })
     .withMessage("There is no blog with such id")
        .matches(/^[0-9a-fA-F]+$/, 'i')
        .withMessage('invalidId'),
    ]