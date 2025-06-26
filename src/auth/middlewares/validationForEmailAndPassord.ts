import { body } from "express-validator"
import { UserValidationRules } from "../../users/types/user-types"

export const userPasswordAndEmailValidationMiddlevare = [
     
    body('newPassword')
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