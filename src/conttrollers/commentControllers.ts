import {query, Request, Response} from 'express'
import { ObjectId } from 'mongodb'
import { commentService } from '../domain/comment-servise'
import { InputCommentType, OutputCommentType } from '../input-uotput-types/comment-types'
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'


export const commentControllers = {
    async updateCommentById(req:Request<{id: string},{},InputCommentType>,res:Response<OutputCommentType>){
        const updateComment = await commentService.updateComment(new ObjectId(req.params.id),req.body.content)
        if(updateComment){
            res.status(204).end()
        }else{
            res.status(404).end()}
    },
    async deleteCommentById(req:Request<{id:string}>, res:Response<OutputCommentType>){
        const isDelete = await commentService.deleteComment(new ObjectId(req.params.id))
        if(isDelete){
            res.status(204).end()
        }else{
            res.status(404).end
        }
    },
    async getCommentById(req:Request<{id:string}>,res:Response<OutputCommentType| OutputErrorsType>){
        const comment = await commentService.getCommentById(new ObjectId(req.params.id))
        if (comment){
            res.status(200).json(comment)
        }else{
            res.status(404).end()
        }
        
    }
}