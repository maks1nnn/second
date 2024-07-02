import { ObjectId } from "mongodb";
import { userRepository } from "../repositories/userMongoRepository"
import { bcryptServise } from "./hashServise";
import { randomUUID } from "crypto";
import {add} from "date-fns";







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
            return newUser;
        } else {
            return false; // или обработайте ошибку соответствующим образом
        }
    },

    async deleteUser (id:ObjectId) {
        return userRepository.deleteUser(id)
    },

    async findById (id:ObjectId) {
        return userRepository.findUser(id)
    },
   
   
}















 