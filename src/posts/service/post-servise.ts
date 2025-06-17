import { PostRepository } from '../repository/postMongo-repositories'
import { blogRepository } from '../../blog/repository/blogMongo-repositories'
import { InputPostInBlogType, InputPostType, OutputPostDBType } from '../types/post-types'
import { PostDBType } from '../../db/post-db-type'
import { ObjectId } from 'mongodb'
import { BlogDBType } from '../../db/blog-db-type'
import { queryPostRepository } from '../repository/postMongoQueryRepository'
import { injectable, inject } from 'inversify'


@injectable()
export class PostServise   {

    constructor(@inject(PostRepository)protected postRepository:PostRepository){

    }
    
    
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

        return this.postRepository.createPosts(inputData) 
    }

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

        return this.postRepository.createPosts(inputData) 
    }


    async findPosts(id: ObjectId) {
        return this.postRepository.findForOutput(id)
    }

    async getAllPostsBySort(query: any) {
        return queryPostRepository.getMany(query)
    }


    async getAllPosts() {
        return this.postRepository.getAllPosts()

    }


    async updatePosts(id: ObjectId, body: InputPostType): Promise<boolean> {
        return this.postRepository.updatePosts(id, body)



    }


    async deletePosts(id: ObjectId): Promise<boolean> {
        return this.postRepository.deletePosts(id)
    }
}