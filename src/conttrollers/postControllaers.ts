import { Request, Response } from 'express'
import { postRepository } from '../repositories/post-repositories'
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'
import { OutputPostDBType, InputPostType } from '../input-uotput-types/post-types'




export const postControllers = {
    async getAll(req: Request, res: Response<OutputPostDBType[]>) {
        const posts = await postRepository.getAllPosts()
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    },

    async find(req: Request<{ id: string }>, res: Response<OutputPostDBType>) {
        const post =await postRepository.findPosts(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).end()
        }
    },

    async create(req: Request<{}, {}, InputPostType>, res: Response<OutputErrorsType | OutputPostDBType>) {

        const newPost =  await postRepository.createPosts(req.body)
        res.status(201).json(newPost)

    },

   async update(req: Request<{ id: string }, {}, InputPostType>, res: Response<OutputErrorsType | OutputPostDBType>) {
        const updatePost = await postRepository.updatePosts(req.params.id, req.body)
        if (updatePost) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    },

    async delete(req: Request<{ id: string }>, res: Response<OutputPostDBType[]>) {
        const isDelete =await  postRepository.deletePosts(req.params.id)
        if (isDelete) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }



}