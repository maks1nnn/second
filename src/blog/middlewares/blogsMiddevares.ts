import { body } from "express-validator"
import { BlogValidatorRules } from '../types/blog-types'

export const blogValidationMiddlewares =[
 body('name')
    .isString()
    .withMessage("Name should be a string")
    .trim()
    .isLength({ min: 1, max: BlogValidatorRules.nameMaxLength })
    .withMessage(`Title should be 1-${BlogValidatorRules.nameMaxLength} characters long`),

  body('description')
    .isString()
    .withMessage('Should be a string')
    .trim()
    .isLength({ min: 1, max: BlogValidatorRules.descriptionMaxLength })
    .withMessage(`Description should be 1-${BlogValidatorRules.descriptionMaxLength} characters long`),

 body('websiteUrl')
    .isString()
    .withMessage('Should be a string')
    .trim()
    .isLength({ min: 1, max: BlogValidatorRules.websiteUrlMaxLength })
    .withMessage(`Content should be 1-${BlogValidatorRules.websiteUrlMaxLength} characters long`)
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/, 'i')
    .withMessage('Invalid website URL'),
]

    