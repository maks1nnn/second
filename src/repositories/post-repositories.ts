import {db} from '../db/db'
import { InputPostType } from '../input-uotput-types/post-types'
import { PostDBType } from '../db/post-db-type'

export const postRepository = {
    findPosts () {

    },

    createPosts(body: InputPostType ){
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

    getAllPosts(){

    },
    updatePosts(id:string,body: InputPostType){

    },
    deletePosts(id:string){
        
    const newPosts = db.posts.filter(v => v.id !== id)
    if (newPosts.length < db.posts.length) {
        db.posts = newPosts
      return true
}else {return false}
    },
}