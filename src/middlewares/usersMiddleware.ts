import { body } from "express-validator"
import { UserValidationRules } from "../input-uotput-types/user-types"

export const userValidationMiddlevare = [
    body('login')
        .isString()
        .withMessage("Login should be string")
        .trim()
        .isLength({ min: UserValidationRules.loginMinLength, max: UserValidationRules.loginMaxLength })
        .withMessage('invalid length ')
        .matches(UserValidationRules.loginPattern, 'i')
        .withMessage('not matches pattern'),

    body('password')
        .isString()
        .withMessage('should be a string')
        .trim()
        .isLength({min: UserValidationRules.passwordMinLength, max: UserValidationRules.passwordMaxLength})
        .withMessage('invalid length'),

    body('email')
    .isString()
    .withMessage('should be a string')
    .trim()
    .matches(UserValidationRules.emailPattern, 'i')
    .withMessage('dont mathes pattern')
    
]