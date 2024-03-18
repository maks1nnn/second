import {Request, Response} from 'express'
import { postRepository } from '../repositories/post-repositories'

export const findPostController = (req: Request, res: Response) => {
   const post = postRepository.findPosts(req.params.id)
    if  ( post ){
        res.status(200).json(post)}else{
            res.send(404)
        } 
}