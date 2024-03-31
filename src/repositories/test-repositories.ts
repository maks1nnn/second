import { db } from '../db/db'
import { postCollection, blogCollection } from '../db/mongo-db'

export const testRepository = {
    
    


   async deleteAll() {
      postCollection.deleteMany({})
      blogCollection.deleteMany({})
       return true
},
}