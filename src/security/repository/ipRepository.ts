import {ObjectId} from 'mongodb'
import { ipControlCollection } from '../../db/mongo-db'
import { DeleteSessionByDeviceIdType, FindSessionByDevice, InputIpType,  } from '../types/ipDbTypes'



export const ipControlRepository = {
    async saveIp(inputData:InputIpType){
       try{ 
        const insertInfo = await ipControlCollection.insertOne(inputData)
         
       }catch(error){
        console.log(error)
       }
    },

    async findSessionByIdAndDeviceId(inputData:FindSessionByDevice){

    },

    async findAllSessionByUserId(userId:ObjectId){

    },

    async deleteAllSesionsByUserId(userId:string){

    },

    async deleteSessionByDeviceId(inputData:DeleteSessionByDeviceIdType){

    },
}