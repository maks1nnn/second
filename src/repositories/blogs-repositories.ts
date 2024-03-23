import { db } from '../db/db'
import { InputBlogType } from '../input-uotput-types/blog-types'
import { BlogDBType } from '../db/blog-db-type'

export const blogRepository = {

    findBlogs(id: string) {
        const blog  = db.blogs.find(p => p.id === id)
        if(blog){
            return blog}else {
                return false
            }
        
    },


    createBlogs(body: InputBlogType) {
        const newBlog: BlogDBType = {
            
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,

            id: (Date.now() + Math.random()).toString(),
        }

        db.blogs = [...db.blogs, newBlog]

        return newBlog;
    },

    getAllBlogs() {
        return db.blogs

    },


    updateBlogs(id: string, body: InputBlogType) {
        const upBlog = db.blogs.find(p => p.id === id)
        if (upBlog) {
           
            upBlog.description = body.description
            upBlog.name = body.name
            upBlog.websiteUrl = body.websiteUrl
            return true
        } else { return false }
    },


    deleteBlogs(id: string) {
        const newBlogs = db.blogs.filter(v => v.id !== id)
        if (newBlogs.length < db.blogs.length) {
            db.blogs = newBlogs
            return true
        } else { return false }
    },
}