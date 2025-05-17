import {MongoClient} from 'mongodb'
import {SETTINGS} from './../../../src/settings'
import {InputUserType} from './../../../src/users/types/user-types'

export const db = {
    client: new MongoClient(SETTINGS.MONGO_URL),

    getDbName() {
        return this.client.db(SETTINGS.DB_NAME)
    },

    async run (){
        try{
        console.log(SETTINGS.MONGO_URL)
        await this.client.connect()
        await this.getDbName().command({ping:1})
        console.log("Connected successfuly to mongo server")
        }catch(err){
            console.error("Can not connect to mongo server", err)
            await this.client.close()
        }
    },

    async stop(){
        await this.client.close()
        console.log("Connection successful closed")
    },

    async drop(){
        try{
            const collections = await this.getDbName().listCollections().toArray()

            for(const collection of collections){
                const collectionName = collection.name;
                await this.getDbName().collection(collectionName).deleteMany({})
            }
            } catch(err){
                console.error("Error in drop db:", err)
                await this.stop()
        }
    }
}