import { postRepository } from '../repositories/postMongo-repositories'
import { blogRepository } from '../repositories/blogMongo-repositories'
import { InputPostInBlogType, InputPostType, OutputPostDBType } from '../input-uotput-types/post-types'
import { PostDBType } from '../db/post-db-type'
//import {blogRepository} from '../repositories/blogs-repositories'
import { ObjectId } from 'mongodb'
import { BlogDBType } from '../db/blog-db-type'
import { queryPostRepository } from '../repositories/postMongoQueryRepository'

export const postServise = {
    async createPosts(body: InputPostType) {
        // Check if the associated blog exists

        const blog = await blogRepository.findForOutput(new ObjectId(body.blogId));
        if (!blog) {
            // If the blog doesn't exist, return an error or throw an exception
            throw new Error("Associated blog not found");
        }

        // Proceed with creating the post
        const inputData = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blog.name,
            createdAt: (new Date()).toISOString()
        };

        return postRepository.createPosts(inputData)
    },

    async createPostInBlog(body:InputPostInBlogType, blogId:string) {
        const blog = await blogRepository.findForOutput(new ObjectId(blogId));
        if (!blog) {
            // If the blog doesn't exist, return an error or throw an exception
           return null
        }

        // Proceed with creating the post
        const inputData = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: (new Date()).toISOString()
        };

        return postRepository.createPosts(inputData)
    },


    async findPosts(id: ObjectId) {
        return postRepository.findForOutput(id)
    },

    async getAllPostsBySort(query: any) {
        return queryPostRepository.getMany(query)
    },


    async getAllPosts() {
        return postRepository.getAllPosts()

    },


    async updatePosts(id: ObjectId, body: InputPostType): Promise<boolean> {
        return postRepository.updatePosts(id, body)



    },


    async deletePosts(id: ObjectId): Promise<boolean> {
        return postRepository.deletePosts(id)
    },
}