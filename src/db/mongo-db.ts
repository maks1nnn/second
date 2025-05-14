import { SETTINGS } from "../settings";
import { Collection, Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb"
import { PostDBType } from "./post-db-type";
import { BlogDBType } from "./blog-db-type";

 

console.log(SETTINGS.MONGO_URL)

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)

export const db : Db = client.db(SETTINGS.DB_NAME);

export const postCollection  = db.collection (SETTINGS.POST_COLLECTION_NAME)
export const blogCollection  = db.collection (SETTINGS.BLOG_COLLECTION_NAME)
export const userCollection   = db.collection (SETTINGS.USER_COLLECTION_NAME)
export const authCollection = db.collection(SETTINGS.AUTH_COLLECTION_NAME)
export const commentCollection = db.collection(SETTINGS.COMMENT_COLLECTION_NAME)
export const jwtCollection = db.collection(SETTINGS.JWT_COLLECTION_NAME)
export const ipControlCollection = db.collection(SETTINGS.IP_COLLECTION_NAME)
export const rateCollection = db.collection(SETTINGS.RATE_COLLECTION_NAME)

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