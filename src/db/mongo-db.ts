import { SETTINGS } from "../settings";
import { Collection, Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb"
import { PostDBType } from "./post-db-type";
import { BlogDBType } from "./blog-db-type";

export const db = {
    client: {} as MongoClient,
    getDBName(): Db {
        return this.client.db(SETTINGS.DB_NAME)
    },
    async run(url: string): Promise<boolean> {
        try {
            this.client = new MongoClient(url, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            })
            await this.client.connect()
            await this.getDBName().command({ ping: 1 })
            console.log('Connected successfully to mongo server')
            return true
        } catch (err: unknown) {
            console.log("Can't connected to mongo server", err)

            await this.stop()
            return false
        }
    },
    async stop(): Promise<void> {
        await this.client.close();
        console.log('connection successfully closed')
    },
    async drop(): Promise<void> {

        try {
            const collections = await this.getDBName().listCollections().toArray()

            for (const collection of collections) {
                const collectionName: string = collection.name;
                await this.getDBName().collection(collectionName).deleteMany({})
            }
        } catch (err) {
            console.error('Error in drop db', err)
            await this.stop()
        }
    },
    getCollections() {
        return {
            postCollection: this.getDBName().collection(SETTINGS.POST_COLLECTION_NAME),
            blogCollection: this.getDBName().collection(SETTINGS.BLOG_COLLECTION_NAME),
            userCollection: this.getDBName().collection(SETTINGS.USER_COLLECTION_NAME),
            authCollection: this.getDBName().collection(SETTINGS.AUTH_COLLECTION_NAME),
            commentCollection: this.getDBName().collection(SETTINGS.COMMENT_COLLECTION_NAME),

        }
    }

}

/*const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)

export const db : Db = client.db(SETTINGS.DB_NAME);

export const postCollection  = db.collection (SETTINGS.POST_COLLECTION_NAME)
export const blogCollection  = db.collection (SETTINGS.BLOG_COLLECTION_NAME)
export const userCollection   = db.collection (SETTINGS.USER_COLLECTION_NAME)
export const authCollection = db.collection(SETTINGS.AUTH_COLLECTION_NAME)
export const commentCollection = db.collection(SETTINGS.COMMENT_COLLECTION_NAME)

export const connectionToDB = async () => {
    try {
        await client.connect()
        return true
    
    }catch(e) {
        console.log(e)
        await client.close()
        return false
    }
}*/