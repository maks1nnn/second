import { ObjectId } from "mongodb"
import { userCollection } from "../db/mongo-db"
import { UserValidationRules } from "../input-uotput-types/user-types";





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

    async findUser(id: ObjectId) {
        const user = await userCollection.findOne({ _id: id })
        if (user) {
            return user



        } else { return null }
    },

    async deleteUser(id: ObjectId) {
        const result = await userCollection.deleteOne({ _id: id })
        return result.deletedCount === 1
    },

    async findByLogin(login: string) {
        const checkUser = await userCollection.findOne({ login });
        if (checkUser) {
            return checkUser
        }
        return false;
    },


    async findByEmail(data: any) {
        const checkUser = await userCollection.findOne({ email: data })
        console.log(checkUser)
        if (checkUser) {
            return checkUser
        } else { return false }
    },

    async findUserByConfirmationCode(code: string) {
        const user = await userCollection.findOne({ confirmationCode: code })

        if (user) {
            return user
        } else {
            return false
        }
    },

    async updateUserIsConfirmed(id: ObjectId, confirm: boolean) {
        const result = await userCollection.updateOne({ _id: id }, {
            $set: {
                "emailConfirmation.isConfirmed": confirm,
            }
        })
        return result.modifiedCount === 1
    },

    async updateUserConfirmInfo(id: ObjectId, confirmCode: string, confirmDate: Date) {
        const result = await userCollection.updateOne({ _id: id }, {
            $set: {
                "emailConfirmation.confirmationCode" : confirmCode,
                "emailConfirmation.expirationDate" : confirmDate,
            }
        })
    },

    async findByEmailOrLogin(body: any) {
        if (UserValidationRules.loginPattern.test(body.loginOrEmail)) {
            const checkUser = await this.findByLogin(body.loginOrEmail)
            return checkUser

        } else if (UserValidationRules.emailPattern.test(body.loginOrEmail)) {
            const checkUser = await this.findByEmail(body.loginOrEmail)
            return checkUser
        } else { return null }
    },


}