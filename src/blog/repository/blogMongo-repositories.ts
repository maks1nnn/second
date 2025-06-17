import { blogCollection } from '../../db/mongo-db';
import { InputBlogType } from '../types/blog-types'
import { BlogDBType } from '../../db/blog-db-type'
import { ObjectId } from 'mongodb'

export const blogRepository = {

     

    async createBlogs(inputData: InputBlogType) {
        
        try {
            const insertInfo = await  blogCollection.insertOne(inputData)  
            return insertInfo.insertedId
        }
        catch (e) {
            console.error(e)
            return false
        }
    },

    async findBlogs(id: ObjectId) {
        const blog = await  blogCollection.findOne({ _id: id })
        if (blog) {
            return blog                         
        } else { return null }
    },
    async findForOutput(id: ObjectId) {
        const blog = await this.findBlogs(id)
        if (blog !== null) {
            return this.mapToOutput(blog as BlogDBType)
        } else { return null }
    },

    mapToOutput(blog: BlogDBType) {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: blog.isMembership,
            createdAt: blog.createdAt,
        }
    },

    async getAllBlogs() {
        const blogs = await  blogCollection.find({}).toArray();
        return blogs.map(blog => ({
            id: blog._id.toString(), // Преобразование ObjectId в строку для использования в тесте
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: blog.isMembership,
            createdAt: blog.createdAt,
        }));
    },

    async updateBlogs(id: ObjectId, body: InputBlogType) {
        const result = await  blogCollection.updateOne({ _id: id }, {
            $set: {
                description: body.description,
                name: body.name,
                websiteUrl: body.websiteUrl
            }
        })
        return result.modifiedCount === 1;
    },

    async deleteBlogs(id: ObjectId) {
        const result = await  blogCollection.deleteOne({ _id: id })
        return result.deletedCount === 1
    },
}