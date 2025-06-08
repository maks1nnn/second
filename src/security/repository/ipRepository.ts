import { ObjectId } from 'mongodb'
import { isatty } from 'tty'
import { ipControlCollection } from '../../db/mongo-db'
import { DeleteSessionByDeviceIdType, FindSessionByDevice, InputIpType, RefreshSessionDataType, } from '../types/ipDbTypes'



export const ipControlRepository = {

    async saveIp(inputData: InputIpType) {
        // console.log(inputData+ "dddddaaaaaaaaataaaaaaaa")
        try {
            const result = await ipControlCollection.insertOne(inputData)
            if(result !== undefined){return result.insertedId}else {return null }
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async findSessionByIdAndDeviceId(inputData: FindSessionByDevice) {
        const query = {
            $and: [
                { user_id: inputData.id },
                { deviceId: inputData.deviceId }
            ]
        }
        const session = await ipControlCollection.findOne(query)
        if (session) {

            return {
                ip: session.ip,
                title: session.title,
                lastActiveDate: session.lastActiveDate,
                deviceId: session.deviceId,
                iat: session.iat,
            }
        } else { return null }
    },

    async findAllSessionByUserId(id: string) {
         
        const data = await ipControlCollection.find({ user_id: id }).toArray()


        if (data) {

            return data.map(dat => ({
                ip: dat.ip,
                title: dat.title,
                lastActiveDate: dat.lastActiveDate,
                deviceId: dat.deviceId
            }))
        } else {
            return null
        }
    },

    async deleteAllSessionsByUserId(userId: string, deviceId: string) {
        const result = await ipControlCollection.deleteMany({ 
            user_id: userId,
            deviceId: { $ne: deviceId } // Удаляем все, где deviceId НЕ равен переданному
        });
        return result.deletedCount;
    },

    async deleteSessionByDeviceId(inputData: DeleteSessionByDeviceIdType) {
        const result = await ipControlCollection.deleteOne({
            $and: [
                { user_id: inputData.id },
                { deviseId: inputData.deviceId }
            ]
        })
        if(result.deletedCount !== 1){
            return null}else{
                return result.deletedCount
            }
    },
    async refreshSession(inputData: RefreshSessionDataType) {
        const result = await ipControlCollection.findOneAndUpdate(
            {
                id: inputData.id,
                deviceId: inputData.deviceId
            },
            {
                $set: {
                    iat: inputData.iat,
                }
            },
            /*{
                returnDocument: 'after', // Возвращаем обновленный документ
                upsert: false // Не создавать новую запись, если не найдена
            }*/

        );
        if (result !== null) { return result.modifiedCount === 1; }else {
            return null
        }


    },
    async findSessionByDeviceId(deviceId: string) {
         
        const session = await ipControlCollection.findOne({deviceId:  deviceId})
        if (session) {

            return {
                ip: session.ip,
                title: session.title,
                lastActiveDate: session.lastActiveDate,
                deviceId: session.deviceId,
                iat: session.iat,
            }
        } else { return null }
    },
}