import {ObjectId} from 'mongodb'
import { ipControlCollection } from '../../db/mongo-db'
import { DeleteSessionByDeviceIdType, FindSessionByDevice, InputIpType,  } from '../types/ipDbTypes'



export const ipControlRepository = {
    
    async saveIp(inputData:InputIpType){
       try{ 
        const result = await ipControlCollection.insertOne(inputData)
          
       }catch(error){
        console.log(error)
       }
    },

    async findSessionByIdAndDeviceId(inputData:FindSessionByDevice){
        const query = {
            $and:[
                {user_id: inputData.id },
                {deviceId: inputData.deviceId}
            ]
        }
        const session = await ipControlCollection.findOne(query)
        if(session){

            return session
        }else{return null}
    },

    async findAllSessionByUserId(iat:number){
        console.log('fffffffffffffffffff')
        const data = await ipControlCollection.find({iat: iat})
        console.log(data + 'wath me')
        if(data){
            
            return data
        }else{
            return null
        }
    },

    async deleteAllSesionsByUserId(userId:ObjectId){
        const result = await ipControlCollection.deleteMany({user_id: userId})
        return result.deletedCount
    },

    async deleteSessionByDeviceId(inputData:DeleteSessionByDeviceIdType){
        const result = await ipControlCollection.deleteOne({
            $and: [
                {user_id: inputData.id},
                {deviseId: inputData.deviceId}
            ]
        })
    },
}