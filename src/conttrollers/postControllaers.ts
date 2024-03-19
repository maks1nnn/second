import { Request, Response } from 'express'
import { postRepository } from '../repositories/post-repositories'
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'
import { OutputPostDBType, InputPostType } from '../input-uotput-types/post-types'




export const postControllers = {
    getAll(req: Request, res: Response<OutputPostDBType[]>) {
        const posts = postRepository.getAllPosts()
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    },

    find(req: Request<{id:string}>, res: Response<OutputPostDBType>) {
        const post = postRepository.findPosts(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).end()
        }
    },

    create(req: Request<{},{}, InputPostType>, res: Response<OutputErrorsType | OutputPostDBType>) {
        /* const errors = inputValidation(req.body)
         if (errors.errorsMessages.length) {
             res
                 .status(400)
                 .json(errors)
             return
         }*/

        const newPost = postRepository.createPosts(req.body)
        res.status(201).json(newPost)


    },

    update (req:Request<{id:string}, {}, InputPostType>,res:Response<OutputErrorsType|OutputPostDBType>) {
        const updatePost = postRepository.updatePosts(req.params.id, req.body)
        if(updatePost){
        res.status(204).end()}else{
            res.status(404).end()
        }
    },

    delete(req: Request<{id:string}>, res: Response<OutputPostDBType[]>) {
        const isDelete = postRepository.deletePosts(req.params.id)
        if (isDelete) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }



}