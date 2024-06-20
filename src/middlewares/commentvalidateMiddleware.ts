import {body} from "express-validator"
import { CommentyValidatorRules } from "../input-uotput-types/comment-types"

export const commentValidatorMiddlewares = [
    body('content')
    .isString()
    .withMessage("Content is not valid")
    .trim()
    .isLength({min: CommentyValidatorRules.minLength, max:CommentyValidatorRules.maxLength})
    .withMessage("Comment should be 20-300 character long")
]