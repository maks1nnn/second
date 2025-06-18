import { CommentRepository } from "../repository/commentMongoRepositories"
import { ObjectId } from 'mongodb'
import { UserRepository } from "../../users/repository/userMongoRepository"
import { InputCommentType, Result } from "../types/comment-types"
import { ResultStatus } from "../../input-uotput-types/resultCode"
import { injectable, inject } from "inversify"


@injectable()
export class CommentService  {
    constructor(@inject(CommentRepository)protected commentRepository:CommentRepository,
                @inject(UserRepository)protected userRepository:UserRepository){

    }
    async createComment(postId:string , content: string, userId :any)   {
        
        const user = await this.userRepository.findUser(new ObjectId(userId))
        if(user !== null){

        const inputData = {
            _id: new ObjectId(),
            postId: new ObjectId(postId),
            content: content,
            commentatorInfo: {
                userId: user._id ,
                userLogin: user.login ,
            },
            createdAt: (new Date()).toISOString(),

        }

        const newComment = await this.commentRepository.createComment(inputData)
        if (newComment !== null && newComment !== false){
            return newComment
        } else{
            return null}}else{return null}
    }

    async updateComment(commentId: ObjectId , body: InputCommentType, userId: any):Promise<Result> {
       const isComment = await  this.getCommentById(commentId)
       if(isComment !== false){
        
        if(isComment.commentatorInfo.userId.toString() !== userId){
            return {
                status: ResultStatus.Forbidden,
                data:null
            }
        }
       }
       if (isComment === false){
        return {
            status: ResultStatus.NotFound,
            
            data:null
        }
       }  
       
       
       
        const update = await this.commentRepository.updateComment(commentId, body)
        if (update) {
            return {
                status: ResultStatus.Success,
                data: null
            }
        } else {
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }
    }

    async deleteComment(id: ObjectId,userId:string | null): Promise<Result> {
        const isComment = await  this.getCommentById(id)
       if(isComment !== false){
        if(isComment.commentatorInfo.userId.toString() !== userId){
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }
       } 
       if (isComment === false){
        return {
            status: ResultStatus.NotFound,
            
            data:null
        }
       }  


        const isDelete = await this.commentRepository.deleteComment(id)
        if (isDelete) {
            return {
                status: ResultStatus.Success,
                data: null
            }
        } else {
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }

    }

    async getCommentById(id: ObjectId ) {
        const findComment = await this.commentRepository.findComment(id)
        if (findComment !== null) {
            return findComment
        } else {
            return false
        }
    }


}