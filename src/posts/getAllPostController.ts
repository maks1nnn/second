import {Request, Response} from 'express'
import { postRepository } from '../repositories/post-repositories'

export const getAllPostController = (req: Request, res: Response) => {
   const posts = postRepository.getAllPosts()
    if  ( posts ){
        res.status(200).json(posts)}else{
            res.send(404)
        } 
}