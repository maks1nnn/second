import {Request, Response} from 'express'
//import {db} from '../db/db'
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'
import { OutputPostDBType, InputPostType } from '../input-uotput-types/post-types'
//import { PostDBType } from '../db/post-db-type'
import { inputValidation } from './validator/inputValidator'
import { postRepository } from '../repositories/post-repositories'


export const createPostController = (req:Request,res:Response<OutputErrorsType|OutputPostDBType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }

    const newPost = postRepository.createPosts(req.body)
    res.status(201).json(newPost)

   
}
