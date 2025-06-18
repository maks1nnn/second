import {query, Request, Response} from 'express'
import { ObjectId } from 'mongodb'
import { CommentService } from '../servise/comment-servise'
import { InputCommentType, OutputCommentType } from '../types/comment-types'
import { OutputErrorsType } from '../../input-uotput-types/output-errors-types'
import { ResultStatus } from '../../input-uotput-types/resultCode'
import { injectable, inject } from 'inversify'


@injectable()
export class CommentControllers   {
    constructor(@inject(CommentService)protected commentService:CommentService){}
    
    async updateCommentById(req:Request<{commentId : string},{},InputCommentType>,res:Response ){
        const updateComment = await this.commentService.updateComment(new ObjectId(req.params.commentId ),req.body,req.userId )
        if(updateComment.status === ResultStatus.Success){
            res.status(204).end()
        }else if(updateComment.status === ResultStatus.Forbidden ){
            res.status(403).end()
        }else if(updateComment.status === ResultStatus.NotFound ){
            res.status(404).end()
        }
    }
    async deleteCommentById(req:Request<{commentId :string}>, res:Response ){
        const isDelete = await this.commentService.deleteComment(new ObjectId(req.params.commentId),req.userId)
        if(isDelete.status === "Sucsess"){
            res.status(204).end()
        }else if(isDelete.status === "Forbidden" ){
            res.status(403).end()
        }else if(isDelete.status === "NotFound" ){
            res.status(404).end()
        }
    }
    async getCommentById(req:Request<{id:string}>,res:Response<OutputCommentType| OutputErrorsType>){
        const comment = await this.commentService.getCommentById(new ObjectId(req.params.id))
        if (comment){
            res.status(200).json(comment)
        }else{
            res.status(404).end()
        }
        
    }
}