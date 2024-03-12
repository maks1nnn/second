import {Request, Response} from 'express'
import { postRepository } from '../repositories/post-repositories'

export const deletePostController = (req: Request, res: Response) => {
   const vin = postRepository.deletePosts(req.params.id)
    if  ( vin ){
        res.send(204)}else{
            res.send(404)
        } 
}