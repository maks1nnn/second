import { ObjectId } from "mongodb";
import { userRepository } from "../repositories/userMongoRepository"
import { bcryptServise } from "./hashServise";







export const userServise = {
    async createNewUser(body: any) {
        const passwordHash = await bcryptServise.generateHash(body.password)
    
        const inputData = {
            login: body.login,
            passwordHash: passwordHash,
            email: body.email, 
            createdAt: (new Date()).toISOString(),                     
        }
    
        const userId = await userRepository.createUser(inputData)
        if (userId) {
            const newUser = await userRepository.findUser(userId)
            return newUser;
        } else {
            return null; // или обработайте ошибку соответствующим образом
        }
    },

    async deleteUser (id:ObjectId) {
        return userRepository.deleteUser(id)
    },

    async findById (id:ObjectId) {
        return userRepository.findUser(id)
    }
}













 