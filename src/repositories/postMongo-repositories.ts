import { postCollection } from '../db/mongo-db'
import { blogCollection } from '../db/mongo-db'
import { InputPostType, OutputPostDBType } from '../posts/types/post-types'
import { PostDBType } from '../db/post-db-type'
//import {blogRepository} from '../repositories/blogs-repositories'
import { ObjectId } from 'mongodb'
import { BlogDBType } from '../db/blog-db-type'

export const postRepository = {
    async createPosts(inputData: InputPostType) {


        try {
            const insertInfo = await postCollection.insertOne(inputData);
            console.log(insertInfo);
            return insertInfo.insertedId;
        } catch (error) {
            console.error(error);
            return false;
        }
    },


    async findPosts(id: ObjectId) {
        const post = await postCollection.findOne({ _id: id })
        if (post) {
            return post
        } else { return null }
    },

    async findForOutput(id: ObjectId) {
        const post = await this.findPosts(id)
        if (post !== null) {
            return this.mapToOutput(post as PostDBType)
        } else { return null }
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

    async getAllPosts() {
        const posts = await postCollection.find({}).toArray()
        return posts.map(post => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            blogId: post.blogId,

        }))

    },


    async updatePosts(id: ObjectId, body: InputPostType): Promise<boolean> {
        const result = await postCollection.updateOne({ _id: id }, {
            $set: {
                shortDescription: body.shortDescription,
                title: body.title,
                content: body.content,
                blogId: body.blogId,
            }

        })
        return result.modifiedCount === 1


        /* const upPost = db.posts.find(p => p.id === id)
         if (upPost) {
             upPost.title = body.title
             upPost.shortDescription = body.shortDescription
             upPost.content = body.content
             upPost.blogId = body.blogId
             return true
         } else { return false }*/
    },


    async deletePosts(id: ObjectId): Promise<boolean> {
        const result = await postCollection.deleteOne({ _id: id })
        return result.deletedCount === 1
    },
}