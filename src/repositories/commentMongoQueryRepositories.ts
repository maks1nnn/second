
import { commentCollection } from "../db/mongo-db";


export const queryCommentRepository = {

    helper(query:any){
        return {
            sortBy: query.sortBy ? query.sortBy : "createAt",
            sortDirection: query.sortDirection ? query.sortDirection : "desc",
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize : query.pageSize ? +query.pageSize : 10,
            
        }
    },

    async getAllUsers(postId:string, badQuery :any ){
        const query = this.helper(badQuery)

        
        const filter = { postId: { $regex: postId, $options: 'i'} };

        try {
            const comments = await commentCollection
            .find(filter)
            .sort(query.sortBy, query.sortDirection)
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
            return []
        }
    }
}

