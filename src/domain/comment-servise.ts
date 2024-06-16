import { commentRepository } from "../repositories/commentMongoRepositories"
import { ObjectId } from 'mongodb'
import { userRepository } from "../repositories/userMongoRepository"


export const commentService = {
    async createComment(id:string , content: string, userId :any) {

        const user = await userRepository.findUser(new ObjectId(userId))
        if(user !== null){

        const inputData = {
            postId: id,
            content: content,
            commentatorInfo: {
                userId: user.id ,
                userLogin: user.login ,
            },
            createAt: (new Date()).toISOString(),

        }

        const newComment = await commentRepository.createComment(inputData)
        if (newComment !== null){
            return newComment
        } else{
            return null}}
    },

    async updateComment(id: ObjectId , content: string) {
        const update = await commentRepository.updateComment(id, content)
        if (update) {
            return true
        } else {
            return false
        }
    },

    async deleteComment(id: ObjectId ) {
        const isDelete = await commentRepository.deleteComment(id)
        if (isDelete) {
            return true
        } else {
            return false
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