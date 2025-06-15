import { ObjectId } from "mongodb"
import { userCollection } from "../db/mongo-db"
import { UserDBType } from "../db/user-db-types";
import { UserValidationRules } from "../users/types/user-types";





export const userRepository = {

    async createUser(inputData: any) {
         
            const insertInfo = await userCollection.insertOne(inputData)
            if (insertInfo) {return insertInfo.insertedId; // Возвращаем ID созданного пользователя
        } else { return null }
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

    async findByLogin(data: string) {
        const checkUser = await userCollection.findOne({ login: data });
        if (checkUser) {
            return checkUser
        }
        else { return false }
    },


    async findByEmail(data: string) {
        const checkUser = await userCollection.findOne({ email: data })
        if (checkUser) {
            return checkUser
        } else { return false }
    },

    async findUserByConfirmationCode(code: string) {

        const user = await userCollection.findOne({ "emailConfirmation.confirmationCode": code })

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
                "emailConfirmation.confirmationCode": confirmCode,
                "emailConfirmation.expirationDate": confirmDate,
            }
        })
        return result.modifiedCount === 1
    },

    async findByEmailOrLogin(loginOrEmail: string) {

        const user = await userCollection.findOne({
            $or: [{ login: loginOrEmail }, { email: loginOrEmail }]
        });
        if (user) {
            return user
        } else {
            return null
        }
    },


}