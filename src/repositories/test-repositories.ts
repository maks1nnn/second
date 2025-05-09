import { db } from '../db/db'
import {  postCollection, blogCollection, userCollection, authCollection, commentCollection, ipControlCollection } from '../db/mongo-db'

export const testRepository = {
    
    


   async deleteAll() {
      postCollection.deleteMany({})
      blogCollection.deleteMany({})
      userCollection.deleteMany({})
      authCollection.deleteMany({})
      commentCollection.deleteMany({})
      ipControlCollection.deleteMany({})
       return true
},
}