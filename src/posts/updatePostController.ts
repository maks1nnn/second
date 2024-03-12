import { postRepository } from "../repositories/post-repositories";
import {Request, Response} from 'express'


export const updatePostController = (req:Request,res:Response) => {
    const updatePost = postRepository.updatePosts(req.params.id, req.body)

    res.status(201).json(updatePost)
}