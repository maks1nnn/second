import { ObjectId } from "mongodb"
import { userCollection } from "../db/mongo-db"





export const userRepository = {
    async createUser(inputData: any) {
        try {
            const insertInfo = await userCollection.insertOne(inputData)
            return insertInfo.insertedId; // Возвращаем ID созданного пользователя
        } catch (e) {
            console.log(e)
            return false; // или обработайте ошибку соответствующим образом
        }
    },

    async findUser (id: ObjectId) {
        const user = await userCollection.findOne({ _id: id})
        if (user){
            return {
               
                    id: user._id.toString(),
                    login: user.login,
                    email: user.email,
                    createdAt: user.createdAt,
                  
            }
                                

            
        }else{return null}
    },

    async deleteUser (id: ObjectId){
        const result = await userCollection.deleteOne({_id: id})
        return result.deletedCount === 1
    },

    async findByLogin(login: string) {
        const checkUser = await userCollection.findOne({ login });
        if (checkUser) {
            return {
                hash: checkUser.passwordHash,
                id: checkUser._id.toString(),
            };
        }
        return false;
    },

    
    async findByEmail (data: any){
        const checkUser = await userCollection.findOne({email: data})
        console.log(checkUser)
        if(checkUser){return {hash: checkUser.passwordHash,
            id: checkUser._id.toString(),
        }} else{return false}  
    },


        
}