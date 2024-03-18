import { Request, Response } from 'express'
import { postRepository } from '../repositories/post-repositories'
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'
import { OutputPostDBType, InputPostType } from '../input-uotput-types/post-types'




export const postControllers = {
    getAll(req: Request, res: Response) {
        const posts = postRepository.getAllPosts()
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.send(404)
        }
    },

    find(req: Request, res: Response) {
        const post = postRepository.findPosts(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.send(404)
        }
    },

    create(req: Request, res: Response<OutputErrorsType | OutputPostDBType>) {
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

    update (req:Request,res:Response) {
        const updatePost = postRepository.updatePosts(req.params.id, req.body)
        if(updatePost){
        res.send(204)}else{
            res.send(404)
        }
    },

    delete(req: Request, res: Response) {
        const isDelete = postRepository.deletePosts(req.params.id)
        if (isDelete) {
            res.send(204)
        } else {
            res.send(404)
        }
    }



}