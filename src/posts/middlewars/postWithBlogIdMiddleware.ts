import {body, param} from "express-validator" 
import {PostValidatorRules} from '../types/post-types' 


export const postWithBlogValidationMiddlewares =[
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

    
    ]