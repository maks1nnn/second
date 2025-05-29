import {ObjectId} from 'mongodb'
import { isatty } from 'tty'
import { ipControlCollection } from '../../db/mongo-db'
import { DeleteSessionByDeviceIdType, FindSessionByDevice, InputIpType, RefreshSessionDataType,  } from '../types/ipDbTypes'



export const ipControlRepository = {
    
    async saveIp(inputData:InputIpType){
       // console.log(inputData+ "dddddaaaaaaaaataaaaaaaa")
       try{ 
        const result = await ipControlCollection.insertOne(inputData)
         return result.insertedId
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

            return {
                ip: session.ip,
                title: session.title,
                lastActiveDate: session.lastActiveDate,
                deviceId: session.deviceId, 
                iat: session.iat,
            }
        }else{return null}
    },

    async findAllSessionByUserId(id:string){
        console.log('fffffffffffffffffff')
        const data = await ipControlCollection.find({user_id: id}).toArray()

        console.log(data + 'wath me')
        if(data){
            
            return data.map(dat => ({
                ip: dat.ip,
                title: dat.title,
                lastActiveDate: dat.lastActiveDate,
                deviceId: dat.deviceId 
            }))
        }else{
            return null
        }
    },

    async deleteAllSesionsByUserId(userId:string){
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
    async refreshSession (inputData:RefreshSessionDataType){
        const result = await ipControlCollection.findOneAndUpdate(
            { 
                ip: inputData.ip,
                deviceId: inputData.deviceId 
              },
              { 
                $set: { 
                  iat: inputData.iat,
                } 
              },
              { 
                returnDocument: 'after', // Возвращаем обновленный документ
                upsert: false // Не создавать новую запись, если не найдена
              }
            );
         

    }
}