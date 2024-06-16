
import { commentCollection } from "../db/mongo-db";


export const queryCommentRepository = {

    helper(query:any){
        return {
            sortBy: query.sortBy ? query.sortBy : "createAt",
            sortDirection: query.sortDirection ? query.sortDirection : "desc",
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize : query.pageSize ? +query.pageSize : 10,
            searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
            searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null, 
        }
    },

    async getAllUsers(badQuery: any){
        const query = this.helper(badQuery)

        const searchLogin = query.searchLoginTerm !== null ? {login: { $regex: query.searchLoginTerm, $options: 'i'}} : {}
        const searchEmail = query.searchEmailTerm !== null ? {email: { $regex: query.searchEmailTerm, $options: 'i'}} : {}

        const filter = {
            $or:[
                {...searchEmail},
                {...searchLogin}
            ]
        }

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
                    login: comment.login,
                    email: comment.email,
                    createdAt: comment.createdAt
                }))

            }

        }catch (e) {
            console.log(`${e} lol`)
            return []
        }
    }
}

