import { ObjectId } from 'mongodb'
import { CommentDBType } from '../../db/comment-db-types'
import { commentCollection } from '../../db/mongo-db'
import { InputCommentType } from '../types/comment-types';


export const commentRepository = {
    async createComment(inputData: any) {


        try {
            const insertInfo = await commentCollection.insertOne(inputData);
            console.log(insertInfo);
            return insertInfo.insertedId;
        } catch (error) {
            console.error(error);
            return false;
        }

    },

    async findComment (id: ObjectId) {
       const comment = await commentCollection.findOne({_id: id})
       if (comment !== null){
       return this.mapToOutput(comment as any)
       }else {
        return null
       }
    },

    async updateComment(id:ObjectId,  body: InputCommentType ) {
        const result = await commentCollection.updateOne({_id: id}, {
            $set: {
                content: body.content,
            }
        })
        return result.modifiedCount === 1
    },

    async deleteComment(id: ObjectId){
        const result = await commentCollection.deleteOne({_id: id})
        return result.deletedCount === 1
    },

    mapToOutput(comment : CommentDBType){
        return{
            id: comment._id.toString(),
            content: comment.content, 
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin,
            },
            createdAt: comment.createdAt,
        }
    },
}