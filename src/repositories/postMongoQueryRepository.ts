import { ObjectId, SortDirection } from "mongodb"
import { postCollection } from "../db/mongo-db"
import { PostDBType } from "../db/post-db-type"

export const queryPostRepository = {

    helper(query: any) {
        return {
            pageNumber: query.pageNumber ? +query.pageNumber : 1,
            pageSize: query.pageSize ? +query.pageSize : 10,
            sortBy: query.sortBy ? query.sortBy : "createdAt",
            sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
            searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null
        }
    },

    async getMany(badquery: any,/*blogId:string*/) {
        const query = this.helper(badquery)
        // const byId = {_id: new ObjectId(blogId)}
        const search = query.searchNameTerm !== null ? { name: { $regex: query.searchNameTerm, $options: 'i' } } : {}

        try {
            const posts = await postCollection
                .find({
                    //    ...byId,
                    ...search,
                })
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray()

            const c = await postCollection.countDocuments({
                //   ...byId,
                ...search,
            })




            return {
                pagesCount: Math.ceil(c / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: c,
                items: posts.map(post => ({
                    id: post._id.toString(),
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogName: post.blogName,
                    createdAt: post.createdAt,
                    blogId: post.blogId,
                }))
            }

        } catch (e) {
            console.log(e)
            return []
        }
    },

    mapToOutput(post: PostDBType) {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            blogId: post.blogId,

        }
    },
}