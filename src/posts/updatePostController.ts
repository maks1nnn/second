import { postRepository } from "../repositories/post-repositories";
import {Request, Response} from 'express'



export const updatePostController = (req:Request,res:Response) => {
    const updatePost = postRepository.updatePosts(req.params.id, req.body)
    if(updatePost){
    res.send(204)}else{
        res.send(404)
    }
}



