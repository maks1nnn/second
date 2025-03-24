import { ObjectId } from 'mongodb'
import { jwtCollection } from '../db/mongo-db'

export const jwtRepository = {
    async createJwt(inputData: any) {
        try {
            const insertInfo = await jwtCollection.insertOne(inputData)
            return insertInfo.insertedId
        } catch (e) {
            console.log(e)
            return false
        }
    },

    async findJwt(id:string ) {
        const jwt = await jwtCollection.findOne({id : id})
        if (jwt) {
            return jwt;
        }else return null
    },

    async removeJwt(id:string, newJwt:string){
        const result = await jwtCollection.updateOne({id: id}, {
            $set: {
                "jwt" : newJwt,
            }
        })
    }


}