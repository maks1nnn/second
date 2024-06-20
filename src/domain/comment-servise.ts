import { commentRepository } from "../repositories/commentMongoRepositories"
import { ObjectId } from 'mongodb'
import { userRepository } from "../repositories/userMongoRepository"
import { InputCommentType, Result } from "../input-uotput-types/comment-types"
import { ResultStatus } from "../input-uotput-types/resultCode"


export const commentService = {
    async createComment(id:string , content: string, userId :any)   {
        
        const user = await userRepository.findUser(new ObjectId(userId))
        if(user !== null){

        const inputData = {
            postId: id,
            content: content,
            commentatorInfo: {
                userId: user.id ,
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

    async updateComment(id: ObjectId , body: InputCommentType, userId: any):Promise<Result> {
       const isComment = await  this.getCommentById(id)
       if(isComment !== false){
        if(isComment.commentatorInfo.userId !== userId){
            return {
                status: ResultStatus.Forbidden,
                
                data:null
            }
        }
       }  
       
       
       
        const update = await commentRepository.updateComment(id, body)
        if (update) {
            return {
                status: ResultStatus.Success,
                data: null
            }
        } else {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }
    },

    async deleteComment(id: ObjectId,userId:any ): Promise<Result> {
        const isComment = await  this.getCommentById(id)
       if(isComment !== false){
        if(isComment.commentatorInfo.userId !== userId){
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }
       }else {return {
        status: ResultStatus.NotFound,
        data: null
       }}


        const isDelete = await commentRepository.deleteComment(id)
        if (isDelete) {
            return {
                status: ResultStatus.Success,
                data: null
            }
        } else {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }

    },

    async getCommentById(id: ObjectId ) {
        const findComment = await commentRepository.findComment(id)
        if (findComment) {
            return findComment
        } else {
            return false
        }
    },


}