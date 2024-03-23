import { db } from '../db/db'
import { InputPostType, OutputPostDBType } from '../input-uotput-types/post-types'
import { PostDBType } from '../db/post-db-type'
import {blogRepository} from '../repositories/blogs-repositories'
import { BlogDBType } from '../db/blog-db-type'

export const postRepository = {
    
    async findPosts(id:string) {
        const post = db.posts.find(p => p.id === id)
        if(post){
            return post
        }else{return false}
    },


   async createPosts(body: InputPostType) : Promise<OutputPostDBType>  {
        const blog  = blogRepository.findBlogs(body.blogId)
        if (blog){
        const newPost: PostDBType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blog.name, 

            id: (Date.now() + Math.random()).toString()
        }

        db.posts = [...db.posts, newPost]

        return newPost;}
    },

   async getAllPosts() {
        return db.posts

    },


    async updatePosts(id: string, body: InputPostType): Promise<boolean> {
        const upPost = db.posts.find(p => p.id === id)
        if (upPost) {
            upPost.title = body.title
            upPost.shortDescription = body.shortDescription
            upPost.content = body.content
            upPost.blogId = body.blogId
            return true
        } else { return false }
    },


    async deletePosts(id: string) : Promise<boolean> {
        const newPosts = db.posts.filter(v => v.id !== id)
        if (newPosts.length < db.posts.length) {
            db.posts = newPosts
            return true
        } else { return false }
    },
}