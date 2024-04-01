import { blogRepository } from '../repositories/blogMongo-repositories' 
import { InputBlogType } from '../input-uotput-types/blog-types'
import { BlogDBType } from '../db/blog-db-type'
import { ObjectId } from 'mongodb'
import { queryBlogRepository } from '../repositories/blogMongoQueryRepository'

export const blogServise = {
    async createBlogs(body: InputBlogType) {
        const inputData = {

            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            isMembership: false,
            createdAt: (new Date()).toISOString(),


            //id: ( Date.now() + Math.random()).toString(),
        }
       const createBlog = await blogRepository.createBlogs(inputData)
       return createBlog;
    },

    async findBlogById(id: ObjectId) {
       return  blogRepository.findForOutput(id)
       
    },

    async findPostsByBlogId(query:any, blogId:string){
        return queryBlogRepository.findByBlogId(query,blogId)
    },
    

    async getAllBlogs() {
       
        return blogRepository.getAllBlogs();
    },

    async getAllBlogsBySort(query:any,/*blogId:string*/) {
       
        return queryBlogRepository.getMany(query,/*blogId*/)
    },


    async updateBlogs(id: ObjectId, body: InputBlogType) {
       return blogRepository.updateBlogs(id,body)
    },

    async deleteBlogs(id: ObjectId) {

       return blogRepository.deleteBlogs(id)
    },
}