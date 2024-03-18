import { db } from '../db/db'
import { InputPostType } from '../input-uotput-types/post-types'
import { PostDBType } from '../db/post-db-type'

export const postRepository = {
    
    findPosts(id:string) {
        const post = db.posts.find(p => p.id === id)
        if(post){
            return post
        }else{return false}
    },


    createPosts(body: InputPostType) {
        const newPost: PostDBType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,

            id: (Date.now() + Math.random()).toString()
        }

        db.posts = [...db.posts, newPost]

        return newPost;
    },

    getAllPosts() {
        return db.posts

    },


    updatePosts(id: string, body: InputPostType) {
        const upPost = db.posts.find(p => p.id === id)
        if (upPost) {
            upPost.title = body.title
            upPost.shortDescription = body.shortDescription
            upPost.content = body.content
            upPost.blogId = body.blogId
            return true
        } else { return false }
    },


    deletePosts(id: string) {
        const newPosts = db.posts.filter(v => v.id !== id)
        if (newPosts.length < db.posts.length) {
            db.posts = newPosts
            return true
        } else { return false }
    },
}