import { db } from '../db/db'


export const testRepository = {
    
    


    deleteAll() {
       db.posts = []
       db.blogs = [] 
       return true
},
}