import { ObjectId } from "mongodb";
import { userRepository } from "../../repositories/userMongoRepository"
import { bcryptServise } from "../../domain/hashServise";
import { randomUUID } from "crypto";
import {add} from "date-fns";
import { loginController } from "../../auth/controllers/authLoginController";
import { UserDBType, UserOutputForMe } from "../../db/user-db-types";







export const userServise = {
    async createNewUser(body: any) {
        const passwordHash = await bcryptServise.generateHash(body.password)
    
        const inputData = {
            login: body.login,
            email: body.email,
             
            passwordHash,
            createdAt: (new Date()).toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false,
            },
    
        };
    
        const userId = await userRepository.createUser(inputData)
        if (userId) {
            const newUser = await userRepository.findUser(userId)
            return this.mapToOutput(newUser as UserDBType);
        } else {
            return false; // или обработайте ошибку соответствующим образом
        }
    },

    async deleteUser (id:ObjectId) {
        return userRepository.deleteUser(id)
    },

    async findById (id:ObjectId) {
       const user = await userRepository.findUser(id)
       if(user !== null ){
        return this.mapToOutput(user as UserDBType)
       }else {return null}
       
        
    },

    mapToOutput(user:UserDBType){
        return {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        }
    },
   
    async findByIdForMe (id:ObjectId) {
        const user = await userRepository.findUser(id)
        if(user !== null ){
         return this.mapToOutputForMe(user as UserDBType)
        }else {return null}
        
         
     },
 
     mapToOutputForMe(user:UserDBType){
         
         return {                         
             email: user.email,
             login: user.login,
             userId: user._id.toString(), 
         }
     },

      
    
    
}















 