/*import { ObjectId } from 'mongodb'
import { jwtCollection } from '../db/mongo-db'*/

/*export const jwtRepository = {
    async createJwt(inputData: any) {
        try {
            const insertInfo = await jwtCollection.insertOne(inputData)
            console.log(inputData + 'this inputData')
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
                "token" : newJwt,
            }
        })
    }


}*/
 

/*export const jwtRepository = {
    async saveRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
        try {
            // Удаляем все старые токены пользователя
            await jwtCollection.deleteMany({ userId: new ObjectId(userId) })
            
            // Сохраняем новый токен
            const result = await jwtCollection.insertOne({
                userId: new ObjectId(userId),
                token: refreshToken,
                createdAt: new Date()
            })
            
            return !!result.insertedId
        } catch (e) {
            console.error('Failed to save refresh token:', e)
            return false
        }
    },

    async findRefreshToken(userId: string): Promise<string | null> {
        try {
            const tokenData = await jwtCollection.findOne({ 
                userId: new ObjectId(userId) 
            })
            
            return tokenData?.token || null
        } catch (e) {
            console.error('Failed to find refresh token:', e)
            return null
        }
    },

    async invalidateRefreshToken(userId: string): Promise<boolean> {
        try {
            const result = await jwtCollection.deleteMany({ 
                userId: new ObjectId(userId) 
            })
            return result.deletedCount > 0
        } catch (e) {
            console.error('Failed to invalidate refresh token:', e)
            return false
        }
    },

    async compareRefreshToken(userId: string, receivedToken: string): Promise<boolean> {
        try {
            const savedToken = await this.findRefreshToken(userId)
            if (!savedToken) return false
            
            // Простое сравнение (если токены не хэшированы)
            return savedToken === receivedToken
            
            // Или используйте безопасное сравнение:
            // return crypto.timingSafeEqual(
            //     Buffer.from(savedToken),
            //     Buffer.from(receivedToken)
            // )
        } catch (e) {
            console.error('Failed to compare tokens:', e)
            return false
        }
    },
    async logoutAllDevices(userId: string): Promise<boolean> {
        try {
            const result = await jwtCollection.deleteMany({
                userId: new ObjectId(userId)
            })
            
            return result.deletedCount > 0
        } catch (e) {
            console.error('JWT Repository: logoutAllDevices failed', e)
            return false
        }
    },
}*/