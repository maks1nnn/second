import { db } from '../db/db'
import { postCollection, blogCollection, userCollection, authCollection, commentCollection } from '../db/mongo-db'

export const testRepository = {
    
    


   async deleteAll() {
      postCollection.deleteMany({})
      blogCollection.deleteMany({})
      userCollection.deleteMany({})
      authCollection.deleteMany({})
      commentCollection.deleteMany({})
       return true
},
}