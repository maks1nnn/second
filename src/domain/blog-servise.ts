import { blogRepository } from '../repositories/blogMongo-repositories' 
import { InputBlogType } from '../input-uotput-types/blog-types'
import { BlogDBType } from '../db/blog-db-type'
import { ObjectId } from 'mongodb'

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
    

    async getAllBlogs() {
       
        return blogRepository.getAllBlogs();
    },

    async updateBlogs(id: ObjectId, body: InputBlogType) {
       return blogRepository.updateBlogs(id,body)
    },

    async deleteBlogs(id: ObjectId) {

       return blogRepository.deleteBlogs(id)
    },
}