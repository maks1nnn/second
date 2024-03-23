import { SETTINGS } from "../settings";
import {Collection, Db, MongoClient, ObjectId} from "mongodb"
import { PostDBType } from "./post-db-type";
import { BlogDBType } from "./blog-db-type";

console.log(SETTINGS.MONGO_URL)

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)

export const db : Db = client.db(SETTINGS.DB_NAME);

export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)
export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME)

export const connectionToDB = async () => {
    try {
        await client.connect()
        return true
    
    }catch(e) {
        console.log(e)
        await client.close()
        return false
    }
}