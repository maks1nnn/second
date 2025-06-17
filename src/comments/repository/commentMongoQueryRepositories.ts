
import { ObjectId } from "mongodb";
import { commentCollection } from "../../db/mongo-db";


export const queryCommentRepository = {

    helper(query:any){
        return {
            sortBy: query.sortBy ? query.sortBy : "createdAt",
            sortDirection: query.sortDirection ? query.sortDirection : "desc",
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize : query.pageSize ? +query.pageSize : 10,
            
        }
    },

    async getAllUsers(postId:ObjectId, badQuery :any ){
        const query = this.helper(badQuery)
        const byId = postId ? {postId: new ObjectId(postId)} : {}
         


        
        const filter = { ...byId };

        try {
            const comments = await commentCollection
            .find(filter)
            .sort({ [query.sortBy]: query.sortDirection === 'desc' ? -1 : 1 })
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()

            const c = await commentCollection.countDocuments(filter)

            return {
                pagesCount: Math.ceil(c / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: c,
                items: comments.map(comment => ({
                    id: comment._id.toString(),
                    content: comment.content,
                    commentatorInfo: {
                        userId: comment.commentatorInfo.userId,
                        userLogin: comment.commentatorInfo.userLogin,
                    },
                    createdAt: comment.createdAt
                }))

                 
            }

        }catch (e) {
            console.log(`${e} lol`)
            return false
        }
    }
}

