import { commentRepository } from "../repositories/commentMongoRepositories"
import { ObjectId } from 'mongodb'
import { userRepository } from "../repositories/userMongoRepository"
import { InputCommentType, Result } from "../comments/types/comment-types"
import { ResultStatus } from "../input-uotput-types/resultCode"


export const commentService = {
    async createComment(postId:string , content: string, userId :any)   {
        
        const user = await userRepository.findUser(new ObjectId(userId))
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

        const newComment = await commentRepository.createComment(inputData)
        if (newComment !== null){
            return newComment
        } else{
            return null}}
    },

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
       
       
       
        const update = await commentRepository.updateComment(commentId, body)
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
    },

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


        const isDelete = await commentRepository.deleteComment(id)
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

    },

    async getCommentById(id: ObjectId ) {
        const findComment = await commentRepository.findComment(id)
        if (findComment !== null) {
            return findComment
        } else {
            return false
        }
    },


}